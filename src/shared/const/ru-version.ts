// Activity types
export enum ActivityTypeEnum {
  RESTAURANT = "RESTAURANT",
  CAFE = "CAFE",
  BAR = "BAR",
  FAST_FOOD = "FAST_FOOD",
  FOOD_COURT = "FOOD_COURT",
  BAKERY = "BAKERY",
  CATERING = "CATERING",
}

export const activityTypeMapper: Record<ActivityTypeEnum, string> = {
  [ActivityTypeEnum.RESTAURANT]: "Ресторан",
  [ActivityTypeEnum.CAFE]: "Кафе",
  [ActivityTypeEnum.BAR]: "Бар",
  [ActivityTypeEnum.FAST_FOOD]: "Фаст-фуд",
  [ActivityTypeEnum.FOOD_COURT]: "Фуд-корт",
  [ActivityTypeEnum.BAKERY]: "Пекарня",
  [ActivityTypeEnum.CATERING]: "Кейтеринг",
};

// Entity types
export enum EntityTypeEnum {
  INDIVIDUAL = "INDIVIDUAL",
  LLC = "LLC",
  JSC = "JSC",
  PARTNERSHIP = "PARTNERSHIP",
}

export const entityTypeMapper: Record<EntityTypeEnum, string> = {
  [EntityTypeEnum.INDIVIDUAL]: "ИП / Физ. лицо",
  [EntityTypeEnum.LLC]: "ООО",
  [EntityTypeEnum.JSC]: "АО / АОЗТ",
  [EntityTypeEnum.PARTNERSHIP]: "Товарищество",
};

// Tax forms
export enum TaxFormEnum {
  OSN = "OSN",
  USN = "USN",
  PATENT = "PATENT",
}

export const taxFormMapper: Record<TaxFormEnum, string> = {
  [TaxFormEnum.OSN]: "Общая система (ОСН)",
  [TaxFormEnum.USN]: "Упрощённая система (УСН)",
  [TaxFormEnum.PATENT]: "Патент",
};
