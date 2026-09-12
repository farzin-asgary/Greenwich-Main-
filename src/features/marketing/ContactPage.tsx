import React, { useState } from 'react';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { Phone, Mail, MapPin, Send, CheckCircle2, Coffee, Sparkles } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    cafeName: '',
    fullName: '',
    phone: '',
    city: 'تهران',
    tablesCount: '15',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PublicLayout>
      <div className="py-12 px-6 max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121e1c] border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold">
            <Coffee className="w-3.5 h-3.5" />
            <span>راه‌اندازی سرریع در ۲۴ ساعت</span>
          </div>

          <h1 className="text-3xl font-extrabold text-emerald-100 font-['Playfair_Display',serif]">
            درخواست دمو و فعال‌سازی در کافه
          </h1>
          <p className="text-xs sm:text-sm text-emerald-300/70 max-w-lg mx-auto">
            فرم زیر را تکمیل کنید؛ کارشناسان گرینویچ کلاب جهت مشاوره و ارائه کد QR آزمایشی با شما تماس خواهند گرفت.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact info sidebar */}
          <div className="md:col-span-1 space-y-4">
            <div className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-[#d4af37]">ارتباط مستقیم با ستاد</h3>

              <div className="space-y-3 text-emerald-200">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#d4af37]" />
                  <span className="font-mono text-emerald-300">021-88997766</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#d4af37]" />
                  <span className="font-mono text-emerald-300">hello@greenwich.club</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>تهران، خیابان جمهوری، روبروی کافه نادری، پلاک ۱۲۰</span>
                </div>
              </div>

              <div className="border-t border-emerald-900/40 pt-3">
                <span className="text-[11px] text-emerald-400/80 leading-relaxed block">
                  ساعات پاسخگویی: شنبه تا چهارشنبه ۹ الی ۱۸
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <div className="greenwich-card rounded-3xl p-6 sm:p-8 border border-emerald-900/60">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-900/80 border border-emerald-500 text-emerald-300 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-100">درخواست شما با موفقیت ثبت شد</h3>
                  <p className="text-xs text-emerald-300/80 max-w-md mx-auto leading-relaxed">
                    با تشکر از علاقه شما به گرینویچ کلاب. کارشناس مربوطه ظرف ۴ ساعت کاری با شماره <span className="font-mono text-[#d4af37]">{formData.phone}</span> تماس خواهد گرفت.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-[#121e1c] text-emerald-300 text-xs font-bold hover:bg-[#1b4332] border border-emerald-800"
                  >
                    ثبت درخواست جدید
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-emerald-200">نام کافه / مجموعه</label>
                      <input
                        type="text"
                        required
                        value={formData.cafeName}
                        onChange={(e) => setFormData({ ...formData, cafeName: e.target.value })}
                        placeholder="مثلاً: کافه نادری"
                        className="w-full bg-[#0b1312] border border-emerald-900 rounded-xl px-3 py-2 text-emerald-100 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-emerald-200">نام و نام خانوادگی مدیر</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="مثلاً: علی علوی"
                        className="w-full bg-[#0b1312] border border-emerald-900 rounded-xl px-3 py-2 text-emerald-100 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-emerald-200">شماره همراه تماس</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="09123456789"
                        className="w-full bg-[#0b1312] border border-emerald-900 rounded-xl px-3 py-2 text-emerald-100 font-mono focus:outline-none focus:border-[#d4af37] dir-ltr text-right"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-emerald-200">شهر</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#0b1312] border border-emerald-900 rounded-xl px-3 py-2 text-emerald-100 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-emerald-200">تعداد تقریبی میزها</label>
                      <select
                        value={formData.tablesCount}
                        onChange={(e) => setFormData({ ...formData, tablesCount: e.target.value })}
                        className="w-full bg-[#0b1312] border border-emerald-900 rounded-xl px-3 py-2 text-emerald-100 focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="5">کمتر از ۱۰ میز</option>
                        <option value="15">۱۰ تا ۲۰ میز</option>
                        <option value="30">۲۰ تا ۴۰ میز</option>
                        <option value="50">بیشتر از ۴۰ میز</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-emerald-200">توضیحات یا نیازهای خاص کافه</label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="توضیحات اضافی در مورد کافه..."
                      className="w-full bg-[#0b1312] border border-emerald-900 rounded-xl px-3 py-2 text-emerald-100 focus:outline-none focus:border-[#d4af37]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] text-[#fbf9f5] font-bold text-xs hover:brightness-110 transition-all border border-[#d4af37]/40 shadow-xl flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#d4af37]" />
                    <span>ارسال درخواست دمو کافه</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
