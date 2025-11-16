
import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { User, StoreItem, Question } from '../types';
import { INITIAL_COINS, STORE_ITEMS } from '../constants';
import { generateUniqueId } from '../utils/helpers'; // Import generateUniqueId

interface GameContextType {
  user: User | null;
  coins: number;
  purchasedItems: string[]; // Store ALL item IDs (consumable instances and cosmetic item IDs)
  login: (name: string, avatar: string) => void;
  logout: () => void;
  addCoins: (amount: number) => void;
  deductCoins: (amount: number) => boolean; // Returns true if successful, false if insufficient coins
  buyItem: (itemId: string) => boolean;
  applyHelp: (itemId: string, question: Question) => { updatedOptions?: { id: string; text: string; }[], revealedAnswerId?: string };
  getEquippedAvatarFrame: () => string | null;
  getOwnedBadges: () => string[];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('gameUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [coins, setCoins] = useState<number>(() => {
    const savedCoins = localStorage.getItem('gameCoins');
    return savedCoins ? parseInt(savedCoins, 10) : INITIAL_COINS;
  });
  // purchasedItems now stores IDs of all purchased items (consumables and cosmetics)
  const [purchasedItems, setPurchasedItems] = useState<string[]>(() => {
    const savedItems = localStorage.getItem('gamePurchasedItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('gameUser', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('gameCoins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('gamePurchasedItems', JSON.stringify(purchasedItems));
  }, [purchasedItems]);

  const login = useCallback((name: string, avatar: string) => {
    setUser({ name, avatar });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCoins(INITIAL_COINS);
    setPurchasedItems([]); // Clear all purchased items on logout
    localStorage.removeItem('gameUser');
    localStorage.removeItem('gameCoins');
    localStorage.removeItem('gamePurchasedItems');
  }, []);

  const addCoins = useCallback((amount: number) => {
    setCoins(prevCoins => prevCoins + amount);
  }, []);

  const deductCoins = useCallback((amount: number): boolean => {
    if (coins >= amount) {
      setCoins(prevCoins => prevCoins - amount);
      return true;
    }
    return false;
  }, [coins]);

  const buyItem = useCallback((itemId: string): boolean => {
    const item = STORE_ITEMS.find(i => i.id === itemId);
    if (item && deductCoins(item.price)) {
      setPurchasedItems(prevItems => {
        if (item.effect === 'cosmetic_frame' || item.effect === 'cosmetic_badge') {
          // For cosmetic items, only store the base item ID (no unique suffix)
          // Also, ensure unique badges are added once, frames replace old ones implicitly
          if (item.effect === 'cosmetic_badge' && prevItems.some(id => id.startsWith(item.id))) {
             // If badge already owned, don't buy again
            addCoins(item.price); // Refund coins as it's already owned
            return prevItems;
          }
          // Remove old frame if buying a new one (only one frame can be 'equipped' at a time)
          if (item.effect === 'cosmetic_frame') {
            const updatedItems = prevItems.filter(id => !STORE_ITEMS.find(si => si.id === id.split('-')[0])?.effect.includes('cosmetic_frame'));
            return [...updatedItems, item.id];
          }
          return [...prevItems, item.id];
        } else {
          // For consumable items, create a unique ID to allow multiple purchases
          const uniquePurchaseId = `${item.id}-${generateUniqueId()}`;
          return [...prevItems, uniquePurchaseId];
        }
      });
      return true;
    }
    return false;
  }, [deductCoins, addCoins]);

  const applyHelp = useCallback((purchaseId: string, question: Question) => {
    const item = STORE_ITEMS.find(i => i.id === purchaseId.split('-')[0]); // Find original item from ID
    // Filter out the specific consumable item by its unique purchaseId
    setPurchasedItems(prevItems => prevItems.filter(id => id !== purchaseId));

    if (!item || !question.options || question.options.length === 0) {
      return {};
    }

    if (item.effect === 'reveal_answer') {
      return { revealedAnswerId: question.correctAnswerId };
    } else if (item.effect === 'remove_wrong_options') {
      const correctOption = question.options.find(opt => opt.id === question.correctAnswerId);
      const wrongOptions = question.options.filter(opt => opt.id !== question.correctAnswerId);

      if (correctOption && wrongOptions.length >= 2) {
        // Keep the correct one and one random wrong one
        const remainingWrongOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        const updatedOptions = [correctOption, remainingWrongOption].sort(() => Math.random() - 0.5);
        return { updatedOptions };
      } else if (correctOption) {
        // If less than 2 wrong options, just keep the correct one
        return { updatedOptions: [correctOption] };
      }
    }
    return {};
  }, []);

  const getEquippedAvatarFrame = useCallback((): string | null => {
    // Find the most recently purchased frame
    const frameItem = purchasedItems
      .map(id => STORE_ITEMS.find(si => si.id === id))
      .filter(Boolean) // Filter out undefined items
      .filter(item => item?.effect === 'cosmetic_frame')
      .pop(); // Get the last (most recent) one
    
    return frameItem?.visualAsset || null;
  }, [purchasedItems]);

  const getOwnedBadges = useCallback((): string[] => {
    const badgeVisualAssets: string[] = [];
    const ownedBadgeIds = new Set<string>(); // Use a Set to ensure unique badge visual assets

    purchasedItems.forEach(id => {
      const baseItemId = id.split('-')[0]; // Get the base ID for cosmetic items
      const item = STORE_ITEMS.find(si => si.id === baseItemId);
      if (item?.effect === 'cosmetic_badge' && item.visualAsset && !ownedBadgeIds.has(item.visualAsset)) {
        badgeVisualAssets.push(item.visualAsset);
        ownedBadgeIds.add(item.visualAsset);
      }
    });
    return badgeVisualAssets;
  }, [purchasedItems]);


  const value = {
    user,
    coins,
    purchasedItems,
    login,
    logout,
    addCoins,
    deductCoins,
    buyItem,
    applyHelp,
    getEquippedAvatarFrame,
    getOwnedBadges,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};