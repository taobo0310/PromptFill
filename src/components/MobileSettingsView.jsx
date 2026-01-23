import React, { useState } from 'react';
import { 
  Settings, Globe, Database, Download, Upload, 
  RotateCcw, Trash2, Mail, MessageCircle, Github, 
  ChevronRight, RefreshCw, FileText, Info, X,
  Moon, Sun, Heart
} from 'lucide-react';

export const MobileSettingsView = ({ 
  language, setLanguage, 
  storageMode, setStorageMode,
  directoryHandle,
  handleImportTemplate, handleExportAllTemplates,
  handleCompleteBackup, handleImportAllData,
  handleResetSystemData, handleClearAllData,
  SYSTEM_DATA_VERSION, t,
  isDarkMode,
  themeMode,
  setThemeMode
}) => {
  const [showWechatQR, setShowWechatQR] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [storageStats, setStorageStats] = React.useState(null);

  React.useEffect(() => {
    if (storageMode === 'browser' && navigator.storage && navigator.storage.estimate) {
      navigator.storage.estimate().then(estimate => {
        setStorageStats({
          usage: estimate.usage,
          quota: estimate.quota,
          percent: Math.round((estimate.usage / estimate.quota) * 100) || 0
        });
      });
    }
  }, [storageMode]);
  
  // 完善后的更新日志 (同步桌面端内容)
  const updateLogs = language === 'cn' ? [
    { 
      version: 'Data V0.8.7', 
      date: '2026-01-24', 
      title: '提示词作者标注修正',
      content: [
        '🛠️ 修正了部分模版的作者归属信息'
      ]
    },
    { 
      version: 'V0.8.1', 
      date: '2026-01-22', 
      title: '自定义词条支持双语模式',
      content: [
        '✨ 自定义词条现在支持分别输入中英文内容'
      ]
    },
    { 
      version: 'V0.8.0', 
      date: '2026-01-17', 
      title: '智能词条正式上线与多项增强',
      content: [
        '✨ 智能词条正式版：支持 AI 驱动的提示词自动生成',
        '📚 官方模版扩充：新增紫禁城、食品广告等多款模版',
        '🚀 性能优化：优化瀑布流加载与移动端交互体验'
      ]
    },
    { 
      version: 'V0.7.2', 
      date: '2026-01-13', 
      title: '系统架构优化与数据更新',
      content: [
        '全站版本号同步升级至 V0.7.2',
        '数据版本升级至 V0.8.4，扩充词库模版',
        '优化系统运行效率与核心交互性能'
      ]
    },
    { 
      version: 'V0.7.1', 
      date: '2026-01-07', 
      title: '存储架构升级与系统维护',
      content: [
        '核心数据迁移至 IndexedDB，解决 5MB 限制',
        '暂时下线“智能词条”功能，优化存储稳定性',
        '全站版本号对齐升级至 V0.7.1'
      ]
    },
    { 
      version: 'V0.7.0', 
      date: '2026-01-03', 
      title: '导出增强与统计集成',
      content: [
        '新增 Vercel Analytics 数据统计集成',
        '导出长图支持动态短链接二维码，长链接自动降级',
        '图片预览弹窗全面适配暗色模式',
        '引入图片预缓存与代理，解决导出图片空白问题'
      ]
    },
    { 
      version: 'V0.6.5', 
      date: '2025-12-31', 
      title: '数据版本升级与性能优化',
      content: [
        '新增模版链接分享功能，支持通过 URL 快速分享与导入模版',
        '数据版本升级至 V0.7.6，包含多项预置模版更新与词库扩充',
        '系统版本升级至 V0.6.5，优化跨端数据同步稳定性',
        '修复了移动端部分 UI 适配细节'
      ]
    },
    { 
      version: 'V0.6.1', 
      date: '2025-12-26', 
      title: '联动组逻辑修复',
      content: [
        '修复了联动组匹配过于宽松的 Bug，现在仅限相同组号联动',
        '全站版本号同步升级至 V0.6.1'
      ]
    },
    { 
      version: 'V0.6.0', 
      date: '2025-12-23', 
      title: 'UI 全面升级与极简重构',
      content: [
        '侧边栏采用 Morandi 色系重构，视觉更温暖优雅',
        '全面支持暗色模式，支持桌面端与移动端切换'
      ]
    },
    { 
      version: 'V0.5.1', 
      date: '2025-12-22', 
      title: '移动端架构优化',
      content: [
        '全新移动端交互架构，引入侧滑抽屉与沉浸式预览',
        '首页引入 Mesh Gradient 彻底根治背景闪烁',
        '优化了 LocalStorage 存储配额满时的静默处理'
      ]
    },
    { 
      version: 'V0.5.0', 
      date: '2025-12-20', 
      title: '功能增强与性能重构',
      content: [
        '深度架构重构，引入发现页瀑布流展示',
        '导出功能增强，支持 Base64 预取解决图片空白',
        '模版多图编辑功能初步上线'
      ]
    }
  ] : [
    { 
      version: 'Data V0.8.7', 
      date: '2026-01-24', 
      title: 'Author Attribution Fix',
      content: [
        '🛠️ Corrected author info for specific templates'
      ]
    },
    { 
      version: 'V0.8.1', 
      date: '2026-01-22', 
      title: 'Bilingual Custom Terms',
      content: [
        '✨ Added separate CN/EN input for custom terms'
      ]
    },
    { 
      version: 'V0.8.0', 
      date: '2026-01-17', 
      title: 'AI Official Launch & Improvements',
      content: [
        '✨ AI Terms Official: AI-powered prompt generation is live',
        '📚 Library Expansion: Added new high-quality presets',
        '🚀 Performance: Faster loading and smoother UI/UX'
      ]
    },
    { 
      version: 'V0.7.2', 
      date: '2026-01-13', 
      title: 'System Optimization & Data Update',
      content: [
        'Bumped system version to V0.7.2',
        'Data version upgraded to V0.8.4',
        'Optimized system performance and efficiency'
      ]
    },
    { 
      version: 'V0.7.1', 
      date: '2026-01-07', 
      title: 'Storage & Maintenance',
      content: [
        'Migrated core data to IndexedDB (unlimited storage)',
        'Temporarily disabled AI Terms feature',
        'Bumped system version to V0.7.1'
      ]
    },
    { 
      version: 'V0.7.0', 
      date: '2026-01-03', 
      title: 'Export & Analytics Upgrade',
      content: [
        'Integrated Vercel Analytics tracking',
        'Dynamic short-link QR codes for image export',
        'Image preview modal now supports Dark Mode',
        'Fixed image export blanks via pre-caching & proxy'
      ]
    },
    { 
      version: 'V0.6.5', 
      date: '2025-12-31', 
      title: 'Data Update & Optimization',
      content: [
        'Added template link sharing support via public URLs',
        'Data version upgraded to V0.7.6 with new templates and bank expansions',
        'System version upgraded to V0.6.5 with improved sync stability',
        'Fixed minor mobile UI adaptation issues'
      ]
    },
    { 
      version: 'V0.6.1', 
      date: '2025-12-26', 
      title: 'Linkage Group Fix',
      content: [
        'Fixed bug where linkage groups were too loose',
        'Updated version to V0.6.1 across the app'
      ]
    },
    { 
      version: 'V0.6.0', 
      date: '2025-12-23', 
      title: 'UI Upgrade & Minimalist Refactor',
      content: [
        'Sidebar refactored with Morandi palette',
        'Full support for Dark Mode'
      ]
    },
    { 
      version: 'V0.5.1', 
      date: '2025-12-22', 
      title: 'Mobile Architecture Optimization',
      content: [
        'New mobile drawer and immersive preview interaction',
        'Mesh Gradient for smooth background transition',
        'Silent handling for storage quota exceeded errors'
      ]
    },
    { 
      version: 'V0.5.0', 
      date: '2025-12-20', 
      title: 'Features & Performance',
      content: [
        'Discovery view with masonry layout',
        'Enhanced export with Base64 prefetching',
        'Multiple image editing support'
      ]
    }
  ];

  const SettingSection = ({ title, icon: Icon, children }) => (
    <div className="mb-8 px-6">
      <div className={`flex items-center gap-2 mb-4 ${isDarkMode ? 'opacity-60 text-white/60' : 'opacity-40'}`}>
        <Icon size={14} strokeWidth={2.5} />
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">{title}</h3>
      </div>
      <div className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/50 border-white/60'} backdrop-blur-md rounded-3xl border overflow-hidden shadow-sm`}>
        {children}
      </div>
    </div>
  );

  const SettingItem = ({ icon: Icon, label, value, onClick, disabled = false, danger = false, description = null }) => (
    <button 
      disabled={disabled}
      onClick={onClick}
      className={`w-full flex items-center justify-between px-5 py-4 transition-all border-b last:border-0 ${
        isDarkMode ? 'border-white/5' : 'border-gray-100/50'
      } ${
        disabled ? 'opacity-30 cursor-not-allowed' : (isDarkMode ? 'hover:bg-white/5 active:bg-white/10' : 'hover:bg-white/50 active:bg-white/80')
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl flex-shrink-0 ${danger ? 'bg-red-50 text-red-500' : (isDarkMode ? 'bg-white/10 text-gray-300' : 'bg-gray-50 text-gray-600')}`}>
          <Icon size={18} />
        </div>
        <div className="flex flex-col items-start min-w-0">
          <span className={`text-sm font-bold truncate ${danger ? 'text-red-500' : (isDarkMode ? 'text-gray-200' : 'text-gray-700')}`}>{label}</span>
          {description && (
            <span className={`text-[10px] opacity-50 truncate max-w-[180px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{description}</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{value}</span>}
        {!disabled && <ChevronRight size={14} className={isDarkMode ? 'text-gray-600' : 'text-gray-300'} />}
      </div>
    </button>
  );

  return (
    <div className={`flex-1 overflow-y-auto pb-32 relative transition-colors duration-300 ${isDarkMode ? 'bg-[#2A2928]' : 'bg-white'}`}>
      <div className="pt-12 pb-8 px-8">
        <h1 className={`text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('settings')}</h1>
        <p className={`text-xs font-medium mt-1 uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('template_subtitle')}</p>
      </div>

      {/* 1. 系统设置 */}
      <SettingSection title={t('general_settings')} icon={Settings}>
        <SettingItem 
          icon={Globe} 
          label={t('language')} 
          value={language === 'cn' ? '简体中文' : 'English'} 
          onClick={() => setLanguage(language === 'cn' ? 'en' : 'cn')}
        />
        <div className={`w-full flex items-center justify-between px-5 py-4 transition-all border-b ${
          isDarkMode ? 'border-white/5' : 'border-gray-100/50'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-white/10 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
              {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
            </div>
            <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              {language === 'cn' ? '外观模式' : 'Appearance'}
            </span>
          </div>
          <div className={`premium-toggle-container ${isDarkMode ? 'dark' : 'light'} scale-[0.85] origin-right mr-2`}>
            {[
              { id: 'light', label: language === 'cn' ? '亮色' : 'Light' },
              { id: 'dark', label: language === 'cn' ? '暗色' : 'Dark' },
              { id: 'system', label: language === 'cn' ? '自动' : 'Auto' }
            ].map(mode => (
              <button
                key={mode.id}
                onClick={() => setThemeMode(mode.id)}
                className={`premium-toggle-item ${isDarkMode ? 'dark' : 'light'} ${themeMode === mode.id ? 'is-active' : ''}`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
        <SettingItem 
          icon={Database} 
          label={t('storage_mode')} 
          description={language === 'cn' ? '使用 IndexedDB 模式 (无限容量)' : 'IndexedDB Mode (Unlimited)'}
          value={storageMode === 'browser' ? (language === 'cn' ? '浏览器' : 'Browser') : (language === 'cn' ? '本地文件夹' : 'Local Folder')} 
          disabled={true} // 移动端暂不支持切换到本地文件夹
        />
        {storageMode === 'browser' && storageStats && (
          <div className="px-5 mb-4 mt-2">
            <div className="flex justify-between items-center mb-1.5">
              <span className={`text-[10px] font-bold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {language === 'cn' ? '存储空间已用' : 'Storage Used'}
              </span>
              <span className={`text-[10px] font-bold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {(storageStats.usage / 1024 / 1024).toFixed(1)}MB / {(storageStats.quota / 1024 / 1024 / 1024).toFixed(1)}GB
              </span>
            </div>
            <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
              <div 
                className="h-full bg-orange-500/50 transition-all duration-500" 
                style={{ width: `${Math.max(1, storageStats.percent)}%` }}
              />
            </div>
          </div>
        )}
      </SettingSection>

      {/* 2. 数据管理 */}
      <SettingSection title={t('data_management')} icon={RefreshCw}>
        <div className="w-full">
          <label className="block cursor-pointer">
            <input type="file" accept=".json" onChange={handleImportTemplate} className="hidden" />
            <div className={`w-full flex items-center justify-between px-5 py-4 transition-all border-b ${
              isDarkMode ? 'border-white/5 hover:bg-white/5 active:bg-white/10' : 'border-gray-100/50 hover:bg-white/50 active:bg-white/80'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-white/10 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
                  <Download size={18} />
                </div>
                <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t('import_template')}</span>
              </div>
              <ChevronRight size={14} className={isDarkMode ? 'text-gray-600' : 'text-gray-300'} />
            </div>
          </label>
          <SettingItem icon={Upload} label={t('export_all_templates')} onClick={handleExportAllTemplates} />
          <SettingItem icon={RefreshCw} label={t('refresh_system')} onClick={handleResetSystemData} />
          <SettingItem icon={Trash2} label={t('clear_all_data')} onClick={handleClearAllData} danger={true} />
        </div>
      </SettingSection>

      {/* 3. 更新日志 */}
      <SettingSection title={t('what_is_new')} icon={FileText}>
        <div className="p-5 space-y-8">
          {updateLogs.map((log, idx) => (
            <div key={idx} className={`relative pl-5 border-l-2 ${isDarkMode ? 'border-orange-500/40' : 'border-orange-500/20'}`}>
              <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-orange-500" />
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[13px] font-black ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{log.title}</span>
                  {idx === 0 && (
                    <span className="px-1 py-0.5 text-[8px] font-black bg-orange-500 text-white rounded uppercase tracking-wider">
                      {language === 'cn' ? '最新' : 'LATEST'}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-bold tabular-nums ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{log.date}</span>
              </div>
              <ul className="space-y-1.5">
                {log.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`} />
                    <p className={`text-xs leading-relaxed font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SettingSection>

      {/* 4. 关于与联系 */}
      <SettingSection title={t('connect_author')} icon={Info}>
        <SettingItem 
          icon={Heart} 
          label={language === 'cn' ? '鸣谢与致敬' : 'Credits'} 
          onClick={() => setShowCredits(true)}
        />
        <SettingItem 
          icon={Mail} 
          label={t('contact_author')} 
          value="tanshilong@gmail.com" 
          onClick={() => window.location.href = 'mailto:tanshilong@gmail.com'}
        />
        <SettingItem 
          icon={MessageCircle} 
          label="微信反馈" 
          value="tanshilongmario" 
          onClick={() => setShowWechatQR(true)}
        />
        <SettingItem 
          icon={Github} 
          label={t('github_link')} 
          onClick={() => window.open('https://github.com/TanShilongMario/PromptFill', '_blank')}
        />
      </SettingSection>

      {/* WeChat QR Popover (Mobile Style) */}
      {showWechatQR && (
        <div 
          className="fixed inset-0 z-[400] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-6"
          onClick={() => setShowWechatQR(false)}
        >
          <div 
            className={`${isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-white border-white/60'} w-full max-w-sm p-8 rounded-[40px] shadow-2xl border relative animate-in zoom-in-95 duration-300`}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowWechatQR(false)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center">
              <div className={`w-56 h-56 ${isDarkMode ? 'bg-black' : 'bg-gray-50'} rounded-3xl overflow-hidden mb-6 border ${isDarkMode ? 'border-white/5' : 'border-gray-100'} p-3 shadow-inner`}>
                <img 
                  src="/Wechat.jpg" 
                  alt="WeChat QR Code" 
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>
              <p className={`text-lg font-black mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>扫码添加作者微信</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Connect on WeChat</p>
            </div>
          </div>
        </div>
      )}

      {/* Credits Popover (Mobile Style) */}
      {showCredits && (
        <div 
          className="fixed inset-0 z-[400] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-6"
          onClick={() => setShowCredits(false)}
        >
          <div 
            className={`${isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-white border-white/60'} w-full max-w-sm p-8 rounded-[40px] shadow-2xl border relative animate-in zoom-in-95 duration-300`}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowCredits(false)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-orange-500 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${isDarkMode ? 'bg-orange-500/10' : 'bg-orange-50'}`}>
                <Heart size={28} className="text-orange-500 fill-orange-500" />
              </div>
              
              <h3 className={`text-xl font-black mb-4 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {language === 'cn' ? '鸣谢与致敬' : 'Credits'}
              </h3>
              
              <div className={`space-y-4 text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <p className="font-bold text-orange-600">
                  {language === 'cn' 
                    ? '本项目为开源项目，旨在提升 AI 创作者的工作流效率。' 
                    : 'An open-source project for AI creators.'}
                </p>
                
                <p>
                  {language === 'cn' ? '感谢灵感来源作者：' : 'Thanks to prompt authors:'}
                  <br />
                  <span className={`font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    宝玉(@dotey), MarioTan(@tanshilong), sundyme, Berryxia.AI, sidona, AmirMushich, Latte(@0xbisc), 阿兹特克小羊驼(@AztecaAlpaca)
                  </span>
                </p>
                
                <p>
                  {language === 'cn' ? '初期支持：' : 'Early support:'} 
                  <span className={`font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>松果先森</span>
                  <br />
                  {language === 'cn' ? '及所有提供建议、Bug 发现的小伙伴。' : '& all community contributors.'}
                </p>
                
                <div className={`h-px w-10 mx-auto my-4 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`} />
                
                <p className="italic">
                  {language === 'cn' 
                    ? '最终感谢我的挚爱，我的女神，感谢她能够忍受我在半夜敲键盘的声音，并给予我一路的陪伴和支持。' 
                    : 'Final thanks to my beloved, my goddess, for enduring my late-night typing and for her constant support.'}
                  <Heart size={10} className="inline ml-1 text-red-500 fill-red-500" />
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`text-center pb-8 ${isDarkMode ? 'opacity-10' : 'opacity-20'}`}>
        <p className={`text-[10px] font-black tracking-[0.3em] uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}>Prompt Fill V0.8.1</p>
        <p className={`text-[9px] font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Made by CornerStudio</p>
      </div>
    </div>
  );
};
