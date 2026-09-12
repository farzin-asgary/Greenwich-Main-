import React, { useState } from 'react';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    cafeName: '',
    branchesCount: '1',
    city: '',
    phone: '',
    bestTimeToCall: 'صبح (۹ تا ۱۲)'
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'validation_error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validatePhone = (phone: string) => {
    return /^09\d{9}$/.test(phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.cafeName || !formData.city || !formData.phone) {
      setStatus('validation_error');
      setErrorMessage('لطفاً تمامی فیلدهای ستاره‌دار را تکمیل کنید.');
      return;
    }

    if (!validatePhone(formData.phone)) {
      setStatus('validation_error');
      setErrorMessage('شماره موبایل نامعتبر است (مثال: 09121112233).');
      return;
    }

    // Simulate Submit
    setStatus('submitting');
    setErrorMessage('');
    
    // Placeholder function for backend integration
    setTimeout(() => {
      // Simulate success
      setStatus('success');
      
      // Simulate random error (just for example, but we want success mostly)
      // setStatus('error');
      // setErrorMessage('خطای شبکه. لطفاً دقایقی دیگر مجدداً تلاش کنید.');
    }, 1500);
  };

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 space-y-12 pb-20">
        
        {/* Header */}
        <div className="text-center space-y-4 pt-12">
          <h1 className="text-3xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            ارتباط با ما و درخواست راه‌اندازی
          </h1>
          <p className="text-xs sm:text-sm text-emerald-300/70 max-w-lg mx-auto">
            فرم زیر را تکمیل کنید؛ کارشناسان گرینویچ کلاب جهت مشاوره و ارائه دمو با شما تماس خواهند گرفت.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact info sidebar */}
          <div className="md:col-span-1 space-y-4">
            <div className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-4 text-xs bg-[#0b1312]">
              <h3 className="text-sm font-bold text-[#d4af37]">ارتباط مستقیم با ستاد</h3>
              <div className="space-y-3 text-emerald-200">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#d4af37]" />
                  <span className="font-mono text-emerald-300 dir-ltr">021-88997766</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#d4af37]" />
                  <span className="font-mono text-emerald-300">hello@greenwich.club</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">تهران، خیابان جمهوری، روبروی کافه نادری، ساختمان گرینویچ</span>
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
            <div className="greenwich-card rounded-3xl p-6 sm:p-8 border border-emerald-900/60 bg-[#0b1312] min-h-[400px] flex flex-col justify-center">
              
              {status === 'success' ? (
                <div className="text-center space-y-4 fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#1b4332] border border-[#2d6a4f] text-[#d4af37] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-100">درخواست شما با موفقیت ثبت شد</h3>
                  <p className="text-xs text-emerald-300/80 max-w-sm mx-auto leading-relaxed">
                    با تشکر از علاقه شما به گرینویچ کلاب. کارشناس مربوطه به زودی با شماره <span className="font-mono text-[#d4af37]">{formData.phone}</span> تماس خواهد گرفت.
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setFormData({ fullName: '', cafeName: '', branchesCount: '1', city: '', phone: '', bestTimeToCall: 'صبح (۹ تا ۱۲)' });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#121e1c] text-emerald-300 text-xs font-bold hover:bg-[#1b4332] border border-emerald-800 transition-colors"
                  >
                    ثبت درخواست جدید
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs fade-in">
                  
                  {(status === 'error' || status === 'validation_error') && (
                    <div className="p-3 rounded-xl bg-red-900/20 border border-red-900/50 text-red-200 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="font-bold text-emerald-200">نام و نام خانوادگی مدیر <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        disabled={status === 'submitting'}
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-[#121e1c] border border-emerald-900 rounded-xl px-3 py-2.5 text-emerald-100 focus:outline-none focus:border-[#d4af37] transition-colors disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-bold text-emerald-200">نام کافه / مجموعه <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        disabled={status === 'submitting'}
                        value={formData.cafeName}
                        onChange={(e) => setFormData({ ...formData, cafeName: e.target.value })}
                        className="w-full bg-[#121e1c] border border-emerald-900 rounded-xl px-3 py-2.5 text-emerald-100 focus:outline-none focus:border-[#d4af37] transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="font-bold text-emerald-200">شماره همراه تماس <span className="text-red-400">*</span></label>
                      <input
                        type="tel"
                        disabled={status === 'submitting'}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="09121112233"
                        className="w-full bg-[#121e1c] border border-emerald-900 rounded-xl px-3 py-2.5 text-emerald-100 font-mono focus:outline-none focus:border-[#d4af37] transition-colors disabled:opacity-50 dir-ltr text-right placeholder:text-emerald-900/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-bold text-emerald-200">شهر <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        disabled={status === 'submitting'}
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#121e1c] border border-emerald-900 rounded-xl px-3 py-2.5 text-emerald-100 focus:outline-none focus:border-[#d4af37] transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="font-bold text-emerald-200">تعداد شعب</label>
                      <select
                        disabled={status === 'submitting'}
                        value={formData.branchesCount}
                        onChange={(e) => setFormData({ ...formData, branchesCount: e.target.value })}
                        className="w-full bg-[#121e1c] border border-emerald-900 rounded-xl px-3 py-2.5 text-emerald-100 focus:outline-none focus:border-[#d4af37] transition-colors disabled:opacity-50"
                      >
                        <option value="1">۱ شعبه (تک کافه)</option>
                        <option value="2-3">۲ تا ۳ شعبه</option>
                        <option value="4+">۴ شعبه یا بیشتر</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-bold text-emerald-200">زمان مناسب تماس</label>
                      <select
                        disabled={status === 'submitting'}
                        value={formData.bestTimeToCall}
                        onChange={(e) => setFormData({ ...formData, bestTimeToCall: e.target.value })}
                        className="w-full bg-[#121e1c] border border-emerald-900 rounded-xl px-3 py-2.5 text-emerald-100 focus:outline-none focus:border-[#d4af37] transition-colors disabled:opacity-50"
                      >
                        <option value="صبح (۹ تا ۱۲)">صبح (۹ تا ۱۲)</option>
                        <option value="ظهر (۱۲ تا ۱۵)">ظهر (۱۲ تا ۱۵)</option>
                        <option value="عصر (۱۵ تا ۱۸)">عصر (۱۵ تا ۱۸)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] text-[#fbf9f5] font-bold text-xs hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                        <span>در حال ارسال...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#d4af37]" />
                        <span>ثبت درخواست دمو</span>
                      </>
                    )}
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
