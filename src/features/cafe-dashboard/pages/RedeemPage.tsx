import React from 'react';
import { CouponRedeemer } from '../CouponRedeemer';

export const RedeemPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
          صندوق و بازخرید کوپن
        </h1>
        <p className="text-xs text-emerald-300/70 mt-1">
          کد کوپن ارائه‌شده توسط مشتری را اینجا وارد کنید.
        </p>
      </div>

      <div className="mt-8">
        <CouponRedeemer />
      </div>
    </div>
  );
};
