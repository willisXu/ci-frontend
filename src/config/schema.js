// 品牌 Schema 配置
export const BRAND_SCHEMA = [
  {
    title: '基本資訊',
    fields: [
      { label: '品牌代號', key: 'brand_code', type: 'text', required: true },
      { label: '中文名稱', key: 'brand_name_zh', type: 'text' },
      { label: '英文名稱', key: 'brand_name_en', type: 'text' },
      { label: '所屬集團', key: 'group_name', type: 'text' },
    ]
  },
  {
    title: '定位與策略',
    fields: [
      { label: '監測優先級', key: 'priority', type: 'select', options: ['High', 'Medium', 'Low'] },
      { label: '定位層級', key: 'positioning_tier', type: 'select', options: ['Luxury', 'High-End', 'Dermo', 'Mass', 'Salon'] },
      { label: '價格區間', key: 'price_range_note', type: 'text' },
      { label: '品牌標語', key: 'tagline', type: 'text' },
      { label: '品牌理念', key: 'philosophy', type: 'textarea' },
      { label: '視覺風格', key: 'visual_style', type: 'textarea' },
    ]
  },
  {
    title: '產品特性',
    fields: [
      { label: '主打成分', key: 'key_ingredients_focus', type: 'tags' },
      { label: '目標年齡', key: 'target_ages', type: 'tags' },
      { label: '目標膚質', key: 'target_skin_types', type: 'tags' },
      { label: '針對問題', key: 'skin_problems', type: 'tags' },
    ]
  },
  {
    title: '通路與行銷',
    fields: [
      { label: '主力通路', key: 'main_channels', type: 'tags' },
      { label: 'KOL 策略', key: 'kol_strategy', type: 'textarea' },
      { label: '促銷習慣', key: 'promotion_habits', type: 'textarea' },
      { label: 'SEO 關鍵字', key: 'seo_keywords', type: 'text' },
      { label: 'Hashtags', key: 'hashtags', type: 'text' },
      { label: '內容風格', key: 'content_style', type: 'textarea' },
    ]
  },
  {
    title: '英雄產品',
    fields: [
      { label: '英雄品項 1', key: 'hero_product_1', type: 'text', placeholder: '產品名|品類|USP|價格' },
      { label: '英雄品項 2', key: 'hero_product_2', type: 'text', placeholder: '產品名|品類|USP|價格' },
      { label: '英雄品項 3', key: 'hero_product_3', type: 'text', placeholder: '產品名|品類|USP|價格' },
    ]
  },
  {
    title: '品牌特色',
    fields: [
      { label: '品類覆蓋', key: 'categories_covered', type: 'tags' },
      { label: '核心功效', key: 'core_benefits', type: 'tags' },
      { label: '愛用成分', key: 'favorite_ingredients', type: 'tags' },
    ]
  },
  {
    title: '連結與備註',
    fields: [
      { label: '官網連結', key: 'official_links', type: 'text' },
      { label: '成本備註', key: 'notes_cost', type: 'textarea' },
      { label: '行銷備註', key: 'notes_marketing', type: 'textarea' },
      { label: '趨勢備註', key: 'notes_trends', type: 'textarea' },
    ]
  },
  {
    title: '狀態資訊',
    fields: [
      { label: '資料狀態', key: 'status', type: 'select', options: ['Draft', 'Published', 'Archived'] },
      { label: '最後更新', key: 'last_updated_at', type: 'text', readOnly: true },
      { label: '更新者', key: 'last_updated_by', type: 'text', readOnly: true },
      { label: '版本', key: 'version', type: 'number', readOnly: true },
    ]
  }
];

// 產品 Schema 配置
export const PRODUCT_SCHEMA = [
  {
    title: '基本資訊',
    fields: [
      { label: 'SKU', key: 'sku', type: 'text', required: true },
      { label: '中文名稱', key: 'product_name_zh', type: 'text' },
      { label: '英文名稱', key: 'product_name_en', type: 'text' },
      { label: '品牌代號', key: 'brand_code', type: 'text' },
      { label: '狀態', key: 'status', type: 'select', options: ['OnSale', 'ComingSoon', 'Discontinued'] },
      { label: '模板版本', key: 'template_version', type: 'text' },
    ]
  },
  {
    title: '功效與賣點',
    fields: [
      { label: '核心功效', key: 'core_benefits', type: 'tags' },
      { label: '完整功效', key: 'full_benefits', type: 'tags' },
      { label: '使用情境', key: 'scenarios', type: 'tags' },
      { label: '核心賣點 1', key: 'usp_1', type: 'text' },
      { label: '核心賣點 2', key: 'usp_2', type: 'text' },
      { label: '核心賣點 3', key: 'usp_3', type: 'text' },
      { label: '無添加標示', key: 'no_additives', type: 'text' },
    ]
  },
  {
    title: '品類分類',
    fields: [
      { label: '主品類', key: 'category_major', type: 'text' },
      { label: '子品類', key: 'category_minor', type: 'text' },
      { label: '細節分類', key: 'subcategory_detail', type: 'text' },
      { label: '防曬資訊', key: 'sun_protection', type: 'text' },
    ]
  },
  {
    title: '規格與價格',
    fields: [
      { label: '容量', key: 'volume', type: 'number' },
      { label: '容量單位', key: 'volume_unit', type: 'select', options: ['ml', 'g', 'oz', 'pcs'] },
      { label: '價格', key: 'price', type: 'number' },
      { label: '幣別', key: 'currency', type: 'select', options: ['TWD', 'USD', 'CNY', 'JPY', 'KRW'] },
      { label: '每毫升價格', key: 'unit_price_per_ml', type: 'number' },
      { label: '價格帶', key: 'price_tier', type: 'select', options: ['入門', '中階', '高階', '奢華'] },
    ]
  },
  {
    title: '質地與感官',
    fields: [
      { label: '質地描述', key: 'texture', type: 'text' },
      { label: '質地標籤', key: 'texture_tags', type: 'tags' },
      { label: '香味', key: 'scent', type: 'text' },
      { label: '外觀顏色', key: 'color_appearance', type: 'text' },
    ]
  },
  {
    title: '效期與產地',
    fields: [
      { label: '未開封效期(月)', key: 'shelf_life_closed', type: 'number' },
      { label: '開封後效期(月)', key: 'pao', type: 'number' },
      { label: '原產地', key: 'origin', type: 'text' },
    ]
  },
  {
    title: '成分資訊',
    fields: [
      { label: '主要成分', key: 'key_ingredients', type: 'textarea' },
      { label: 'INCI 成分表', key: 'inci_list', type: 'textarea' },
      { label: '臨床功效', key: 'clinical_results', type: 'textarea' },
      { label: '認證/獎項', key: 'certifications', type: 'tags' },
    ]
  },
  {
    title: '目標受眾',
    fields: [
      { label: '適用膚質', key: 'target_skin_types', type: 'tags' },
      { label: '適用問題', key: 'target_problems', type: 'tags' },
      { label: '目標年齡', key: 'target_ages', type: 'tags' },
      { label: '適用季節', key: 'seasons', type: 'tags' },
      { label: '生活型態', key: 'lifestyle_fit', type: 'tags' },
    ]
  },
  {
    title: '使用說明',
    fields: [
      { label: '使用指引', key: 'usage_guide', type: 'textarea' },
      { label: '使用頻率', key: 'frequency', type: 'text' },
      { label: '注意事項', key: 'warnings', type: 'textarea' },
      { label: '醫美搭配', key: 'medical_procedures_fit', type: 'tags' },
    ]
  },
  {
    title: '媒體資源',
    fields: [
      { label: '圖片 URL', key: 'images', type: 'text' },
    ]
  },
  {
    title: '版本資訊',
    fields: [
      { label: '最後更新', key: 'last_updated_at', type: 'text', readOnly: true },
      { label: '更新者', key: 'last_updated_by', type: 'text', readOnly: true },
      { label: '版本', key: 'version', type: 'number', readOnly: true },
    ]
  }
];

// 原物料 Schema 配置
export const MATERIAL_SCHEMA = [
  {
    title: '基本資訊',
    fields: [
      { label: '原料代碼', key: 'material_code', type: 'text', required: true },
      { label: '供應商代碼', key: 'supplier_code', type: 'text' },
      { label: '中文名稱', key: 'name_zh', type: 'text' },
      { label: '英文名稱', key: 'name_en', type: 'text' },
      { label: 'INCI 名稱', key: 'inci', type: 'text' },
      { label: '別名', key: 'alias', type: 'text' },
    ]
  },
  {
    title: '分類',
    fields: [
      { label: '原料大類', key: 'material_type_major', type: 'text' },
      { label: '原料小類', key: 'material_type_minor', type: 'tags' },
    ]
  },
  {
    title: '物理特性',
    fields: [
      { label: '外觀', key: 'appearance', type: 'text' },
      { label: '物理型態', key: 'physical_form', type: 'text' },
      { label: '顏色選項', key: 'color_options', type: 'text' },
      { label: '氣味', key: 'odor', type: 'text' },
      { label: '產地', key: 'origin_place', type: 'text' },
    ]
  },
  {
    title: '化學組成',
    fields: [
      { label: '主成分', key: 'composition_main', type: 'text' },
      { label: 'CAS 號', key: 'cas', type: 'text' },
      { label: 'EINECS 號', key: 'einecs', type: 'text' },
    ]
  },
  {
    title: '功效機制',
    fields: [
      { label: '功能分類', key: 'function_categories', type: 'tags' },
      { label: '核心功效', key: 'core_efficacy', type: 'text' },
      { label: '作用機制', key: 'mechanism', type: 'textarea' },
      { label: '作用路徑', key: 'pathways', type: 'tags' },
      { label: '作用層次', key: 'skin_layer', type: 'tags' },
    ]
  },
  {
    title: '使用劑量',
    fields: [
      { label: '建議添加量', key: 'dosage_range', type: 'text' },
      { label: '敏弱肌添加量', key: 'sensitive_dosage', type: 'text' },
      { label: '見效時間', key: 'onset_time', type: 'text' },
    ]
  },
  {
    title: '配伍資訊',
    fields: [
      { label: '可配伍成分', key: 'compatible_with', type: 'textarea' },
      { label: '禁忌成分', key: 'avoid_with', type: 'textarea' },
      { label: 'pH/離子性說明', key: 'ph_ionicity_note', type: 'text' },
      { label: '副作用', key: 'side_effects', type: 'textarea' },
    ]
  },
  {
    title: '物化性質',
    fields: [
      { label: '水溶性', key: 'solubility_water', type: 'text' },
      { label: '油溶性', key: 'solubility_oil', type: 'text' },
      { label: '醇溶性', key: 'solubility_alcohol', type: 'text' },
      { label: 'PG 溶性', key: 'solubility_pg', type: 'text' },
      { label: 'HLB 值', key: 'hlb', type: 'number' },
    ]
  },
  {
    title: '配方資訊',
    fields: [
      { label: '配方 pH 範圍', key: 'formula_ph_range', type: 'text' },
      { label: '添加階段', key: 'add_phase', type: 'text' },
      { label: '最高添加溫度', key: 'max_add_temp', type: 'number' },
      { label: '配方備註', key: 'formula_notes', type: 'textarea' },
    ]
  },
  {
    title: '適用產品',
    fields: [
      { label: '適用品類', key: 'applicable_products', type: 'tags' },
      { label: '不適用品類', key: 'not_recommended_products', type: 'tags' },
    ]
  },
  {
    title: '適用族群',
    fields: [
      { label: '適用膚質', key: 'skin_types_fit', type: 'tags' },
      { label: '不適膚質/族群', key: 'not_for_skin', type: 'text' },
      { label: '標示建議', key: 'label_suggestion', type: 'textarea' },
    ]
  },
  {
    title: '臨床與文獻',
    fields: [
      { label: '供應商臨床', key: 'supplier_clinical', type: 'textarea' },
      { label: '第三方臨床', key: 'third_party_clinical', type: 'textarea' },
      { label: '臨床摘要', key: 'clinical_summary', type: 'textarea' },
      { label: '文獻支持', key: 'literature_support', type: 'textarea' },
    ]
  },
  {
    title: '法規資訊',
    fields: [
      { label: '歐盟法規', key: 'regulations_eu', type: 'text' },
      { label: '中國法規', key: 'regulations_nmpa', type: 'text' },
      { label: '台灣法規', key: 'regulations_tw', type: 'text' },
      { label: '日本法規', key: 'regulations_jp', type: 'text' },
      { label: '韓國法規', key: 'regulations_kr', type: 'text' },
      { label: '其他法規', key: 'other_regulations', type: 'textarea' },
    ]
  },
  {
    title: '儲存與效期',
    fields: [
      { label: '儲存條件', key: 'storage_conditions', type: 'text' },
      { label: '儲存溫度', key: 'storage_temp_range', type: 'text' },
      { label: '效期(月)', key: 'shelf_life_months', type: 'number' },
      { label: '復測期(月)', key: 'retest_months', type: 'number' },
      { label: '進料檢驗項目', key: 'incoming_test_items', type: 'textarea' },
      { label: '需防腐挑戰', key: 'challenge_test_needed', type: 'checkbox' },
    ]
  },
  {
    title: '安全資訊',
    fields: [
      { label: 'GHS 分類', key: 'ghs_category', type: 'text' },
      { label: 'GHS 圖示', key: 'ghs_pictograms', type: 'text' },
      { label: '危害警語', key: 'h_statements', type: 'textarea' },
      { label: '防範措施', key: 'p_statements', type: 'textarea' },
      { label: '個人防護', key: 'ppe', type: 'text' },
      { label: '通風要求', key: 'ventilation_note', type: 'text' },
      { label: '洩漏應對', key: 'spill_response', type: 'textarea' },
      { label: '運輸資訊', key: 'transport_info', type: 'textarea' },
    ]
  },
  {
    title: '毒理資訊',
    fields: [
      { label: '毒理摘要', key: 'toxicology_summary', type: 'textarea' },
      { label: '使用限制', key: 'restrictions', type: 'textarea' },
      { label: '毒理來源', key: 'tox_data_source', type: 'text' },
    ]
  },
  {
    title: '永續資訊',
    fields: [
      { label: '永續來源', key: 'sustainability_source', type: 'text' },
      { label: '來源詳情', key: 'source_detail', type: 'text' },
      { label: '天然比例(%)', key: 'natural_ratio', type: 'number' },
      { label: '認證', key: 'certifications', type: 'tags' },
      { label: '可生物降解', key: 'biodegradable', type: 'checkbox' },
      { label: '生物降解標準', key: 'biodegradable_standard', type: 'text' },
      { label: '碳足跡', key: 'carbon_footprint', type: 'text' },
      { label: '生態毒性', key: 'ecotoxicity', type: 'text' },
      { label: '含微塑膠', key: 'microplastic', type: 'checkbox' },
      { label: 'VOC 資訊', key: 'voc', type: 'text' },
      { label: '其他環境說明', key: 'other_env_notes', type: 'textarea' },
    ]
  },
  {
    title: '版本資訊',
    fields: [
      { label: '最後更新', key: 'last_updated_at', type: 'text', readOnly: true },
      { label: '更新者', key: 'last_updated_by', type: 'text', readOnly: true },
      { label: '版本', key: 'version', type: 'number', readOnly: true },
    ]
  }
];

// 下拉選項配置
export const REF_OPTIONS = {
  priority: ['High', 'Medium', 'Low'],
  positioning_tier: ['Luxury', 'High-End', 'Dermo', 'Mass', 'Salon'],
  status: ['Draft', 'Published', 'Archived'],
  product_status: ['OnSale', 'ComingSoon', 'Discontinued'],
  skin_types: ['乾性', '中性', '油性', '混合性', '敏感性'],
  age_groups: ['18-24', '25-34', '35-44', '45-54', '55+'],
  skin_problems: ['抗老', '保濕', '美白', '控油', '抗痘', '修復', '緊緻', '淡斑'],
  categories: ['精華液', '乳霜', '化妝水', '面膜', '防曬', '潔顏', '眼霜', '唇部'],
  channels: ['百貨專櫃', '官網電商', '屈臣氏', '康是美', '電視購物', 'LINE 購物'],
};
