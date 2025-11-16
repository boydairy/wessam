
import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Button } from '../components/Button';
import { STORE_ITEMS } from '../constants';
import { Modal } from '../components/Modal';
import { generateUniqueId } from '../utils/helpers';
import { StoreItem } from '../types';

export const StoreScreen: React.FC = () => {
  const { coins, buyItem, purchasedItems, getEquippedAvatarFrame, getOwnedBadges } = useGame();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);
  const [message, setMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const equippedFrameClass = getEquippedAvatarFrame();
  const ownedBadges = getOwnedBadges();

  const handlePurchaseAttempt = (item: StoreItem) => {
    setSelectedItem(item);
    setShowConfirmation(true);
  };

  const handleConfirmPurchase = () => {
    if (selectedItem) {
      if (selectedItem.effect === 'cosmetic_badge' && ownedBadges.includes(selectedItem.visualAsset || '')) {
        setMessage(`لديك بالفعل شارة "${selectedItem.name}"!`);
        setIsSuccess(false);
        setShowConfirmation(false);
        setSelectedItem(null);
        return;
      }

      // For consumable items, use a unique ID to allow multiple purchases.
      // For cosmetic items, use the base item.id.
      const purchaseIdToUse = (selectedItem.effect === 'reveal_answer' || selectedItem.effect === 'remove_wrong_options')
        ? `${selectedItem.id}-${generateUniqueId()}`
        : selectedItem.id;

      const success = buyItem(purchaseIdToUse);
      if (success) {
        setMessage(`لقد اشتريت ${selectedItem.name} بنجاح! 🎉`);
        setIsSuccess(true);
      } else {
        setMessage('ليس لديك ما يكفي من العملات لشراء هذا العنصر. 🙁');
        setIsSuccess(false);
      }
    }
    setShowConfirmation(false);
    setSelectedItem(null);
  };

  const handleCancelPurchase = () => {
    setShowConfirmation(false);
    setSelectedItem(null);
  };

  const consumableItems = STORE_ITEMS.filter(item => item.effect === 'reveal_answer' || item.effect === 'remove_wrong_options');
  const frameItems = STORE_ITEMS.filter(item => item.effect === 'cosmetic_frame');
  const badgeItems = STORE_ITEMS.filter(item => item.effect === 'cosmetic_badge');

  return (
    <div className="flex flex-col items-center w-full max-w-4xl p-4 md:p-8 bg-white rounded-3xl shadow-2xl border-4 border-green-400 animate-fade-in-up">
      <h2 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-10 text-center animate-bounce-text">
        متجر المساعدات والتخصيص 🛒
      </h2>
      <p className="text-2xl text-gray-700 mb-8">عملاتك الحالية: <span className="font-bold text-yellow-600">{coins}</span> 💰</p>

      {/* Consumable Items */}
      <section className="w-full mb-10">
        <h3 className="text-3xl font-bold text-green-600 mb-6 text-center">مساعدات اللعب</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {consumableItems.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-br from-green-100 to-teal-100 p-6 rounded-2xl shadow-lg border-2 border-green-300 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105"
            >
              <span className="text-6xl mb-4">{item.icon}</span>
              <h3 className="text-2xl font-bold text-green-800 mb-2">{item.name}</h3>
              <p className="text-gray-700 mb-4 flex-grow">{item.description}</p>
              <div className="flex items-center justify-center gap-2 text-xl font-bold text-yellow-700 mb-4">
                {item.price} 💰
              </div>
              <Button
                onClick={() => handlePurchaseAttempt(item)}
                disabled={coins < item.price}
                className="w-full"
                variant={coins < item.price ? 'secondary' : 'primary'}
              >
                {coins < item.price ? 'لا توجد عملات كافية' : 'شراء'}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Avatar Frames */}
      <section className="w-full mb-10">
        <h3 className="text-3xl font-bold text-blue-600 mb-6 text-center">إطارات الصورة الرمزية</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {frameItems.map((item) => {
            const isEquipped = item.visualAsset === equippedFrameClass;
            return (
              <div
                key={item.id}
                className={`bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-2xl shadow-lg border-2 border-blue-300 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 ${isEquipped ? 'ring-4 ring-blue-500' : ''}`}
              >
                <span className={`text-6xl mb-4 rounded-full p-2 ${item.visualAsset || ''}`}>{item.icon}</span>
                <h3 className="text-2xl font-bold text-blue-800 mb-2">{item.name}</h3>
                <p className="text-gray-700 mb-4 flex-grow">{item.description}</p>
                <div className="flex items-center justify-center gap-2 text-xl font-bold text-yellow-700 mb-4">
                  {item.price} 💰
                </div>
                <Button
                  onClick={() => handlePurchaseAttempt(item)}
                  disabled={coins < item.price || isEquipped}
                  className="w-full"
                  variant={isEquipped ? 'success' : (coins < item.price ? 'secondary' : 'primary')}
                >
                  {isEquipped ? 'مجهز حالياً' : (coins < item.price ? 'لا توجد عملات كافية' : 'شراء وتجهيز')}
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Badges */}
      <section className="w-full">
        <h3 className="text-3xl font-bold text-purple-600 mb-6 text-center">شارات الإنجاز</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {badgeItems.map((item) => {
            const isOwned = ownedBadges.includes(item.visualAsset || '');
            return (
              <div
                key={item.id}
                className={`bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl shadow-lg border-2 border-purple-300 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 ${isOwned ? 'ring-4 ring-purple-500' : ''}`}
              >
                <span className="text-6xl mb-4">{item.icon}</span>
                <h3 className="text-2xl font-bold text-purple-800 mb-2">{item.name}</h3>
                <p className="text-gray-700 mb-4 flex-grow">{item.description}</p>
                <div className="flex items-center justify-center gap-2 text-xl font-bold text-yellow-700 mb-4">
                  {item.price} 💰
                </div>
                <Button
                  onClick={() => handlePurchaseAttempt(item)}
                  disabled={coins < item.price || isOwned}
                  className="w-full"
                  variant={isOwned ? 'success' : (coins < item.price ? 'secondary' : 'primary')}
                >
                  {isOwned ? 'مقتناة' : (coins < item.price ? 'لا توجد عملات كافية' : 'شراء')}
                </Button>
              </div>
            );
          })}
        </div>
      </section>


      <Modal isOpen={showConfirmation} onClose={handleCancelPurchase} title="تأكيد الشراء">
        <p className="text-xl mb-4">
          هل أنت متأكد من أنك تريد شراء {selectedItem?.name} مقابل {selectedItem?.price} قطعة نقدية؟
        </p>
        <div className="flex justify-end gap-4">
          <Button onClick={handleConfirmPurchase} variant="primary">
            تأكيد
          </Button>
          <Button onClick={handleCancelPurchase} variant="secondary">
            إلغاء
          </Button>
        </div>
      </Modal>

      <Modal isOpen={!!message} onClose={() => setMessage('')} title={isSuccess ? 'نجاح!' : 'خطأ!'} >
        <p className={`text-xl ${isSuccess ? 'text-green-700' : 'text-red-600'} mb-4`}>{message}</p>
        <Button onClick={() => setMessage('')} variant="primary">
          حسناً
        </Button>
      </Modal>
    </div>
  );
};