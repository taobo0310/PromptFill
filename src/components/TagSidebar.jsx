import React from 'react';
import { TAG_LABELS } from '../constants/styles';

/**
 * TagSidebar 组件 - 侧边 Tag 栏
 * 包含库源筛选、类型筛选和标签筛选功能
 */
export const TagSidebar = ({
  // 数据和状态
  TEMPLATE_TAGS = [],
  availableTags,
  selectedTags = '',
  selectedLibrary = 'all',
  selectedType = 'all',

  // 回调函数
  setSelectedTags,
  setSelectedLibrary,
  setSelectedType,

  // 样式和主题
  isDarkMode = false,
  language = 'cn'
}) => {
  // 如果是移动设备，不渲染此组件
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (isMobile) {
    return null;
  }

  // 通用按钮样式生成器
  const getButtonClass = (isActive) => `w-full text-left px-4 py-3 rounded-2xl transition-all duration-300 group ${
    isActive
      ? (isDarkMode ? 'bg-[#F48B42]/10 text-[#FB923C]' : 'bg-[#F9BC8F]/20 text-[#EA580C]')
      : (isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-orange-600 hover:bg-orange-50/50')
  }`;

  const getSpanClass = (isActive) => `text-sm font-bold ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'} transition-transform inline-block`;

  return (
    <div
      style={{
        width: '140px',
        height: '100%',
        borderRadius: '24px',
        border: '1px solid transparent',
        backgroundImage: isDarkMode
          ? 'linear-gradient(180deg, #3B3B3B 0%, #242120 100%), linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)'
          : 'linear-gradient(180deg, #FAF5F1 0%, #F6EBE6 100%), linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
      }}
      className="hidden lg:flex flex-col flex-shrink-0 pt-12 pb-8 px-3 overflow-hidden"
    >
      {/* 库源筛选 - 固定顶部 */}
      <div className="flex flex-col gap-3 flex-shrink-0">
        <h3 className={`text-xs font-bold uppercase px-4 opacity-50 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {language === 'cn' ? '库源' : 'Library'}
        </h3>
        <div className="flex flex-col gap-1">
          {[
            { id: 'all', cn: '全部', en: 'All' },
            { id: 'official', cn: '官方库', en: 'Official' },
            { id: 'personal', cn: '个人库', en: 'Personal' }
          ].map(lib => (
            <button
              key={lib.id}
              onClick={() => setSelectedLibrary(lib.id)}
              className={getButtonClass(selectedLibrary === lib.id)}
            >
              <span className={getSpanClass(selectedLibrary === lib.id)}>
                {language === 'cn' ? lib.cn : lib.en}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 类型筛选 - 固定在库源下方 */}
      <div className="flex flex-col gap-3 flex-shrink-0 mt-8">
        <h3 className={`text-xs font-bold uppercase px-4 opacity-50 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {language === 'cn' ? '类型' : 'Type'}
        </h3>
        <div className="flex flex-col gap-1">
          {[
            { id: 'all', cn: '全部', en: 'All' },
            { id: 'image', cn: '图片', en: 'Image' },
            { id: 'video', cn: '视频', en: 'Video' }
          ].map(type => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={getButtonClass(selectedType === type.id)}
            >
              <span className={getSpanClass(selectedType === type.id)}>
                {language === 'cn' ? type.cn : type.en}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 标签筛选 - 独立滚动区域 */}
      <div className="flex flex-col gap-3 mt-8 min-h-0 flex-1 overflow-hidden">
        <h3 className={`text-xs font-bold uppercase px-4 opacity-50 flex-shrink-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {language === 'cn' ? '标签' : 'Tags'}
        </h3>
        <div className="flex flex-col gap-1 overflow-y-auto custom-scrollbar pb-4">
          <button
            onClick={() => setSelectedTags('')}
            className={getButtonClass(selectedTags === '')}
          >
            <span className={getSpanClass(selectedTags === '')}>
              {language === 'cn' ? '全部' : 'All'}
            </span>
          </button>

          {(availableTags || TEMPLATE_TAGS).map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTags(tag)}
              className={getButtonClass(selectedTags === tag)}
            >
              <span className={getSpanClass(selectedTags === tag)}>
                {language === 'cn' ? (TAG_LABELS.cn[tag] || tag) : (TAG_LABELS.en[tag] || tag)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
