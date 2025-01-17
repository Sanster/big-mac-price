export class BigMacRecord {
  constructor(
    public name: string,
    public iso_a3: string,
    public currency_code: string,
    public local_price: number,
    public dollar_ex: number,
    public GDP_dollar: number,
    public GDP_local: number,
    public date: string
  ) {}

  get dollarPrice(): number {
    return this.local_price / this.dollar_ex
  }

  get currencySymbol(): string {
    const symbols: { [key: string]: string } = {
      AED: "د.إ",
      ARS: "$",
      AUD: "A$",
      AZN: "₼",
      BHD: ".د.ب",
      BRL: "R$",
      CAD: "C$",
      CHF: "CHF",
      CLP: "$",
      CNY: "¥",
      COP: "$",
      CRC: "₡",
      CZK: "Kč",
      DKK: "kr.",
      EGP: "E£",
      EUR: "€",
      GBP: "£",
      GTQ: "Q",
      HKD: "HK$",
      HNL: "L",
      HUF: "Ft",
      IDR: "Rp",
      ILS: "₪",
      INR: "₹",
      JOD: "JD",
      JPY: "¥",
      KRW: "₩",
      KWD: "KD",
      LBP: "L£",
      MDL: "L",
      MXN: "$",
      MYR: "RM",
      NIO: "C$",
      NOK: "kr",
      NZD: "NZ$",
      OMR: "OMR",
      PEN: "S/",
      PHP: "₱",
      PKR: "₨",
      PLN: "zł",
      QAR: "QR",
      RON: "lei",
      SAR: "SR",
      SEK: "kr",
      SGD: "S$",
      THB: "฿",
      TRY: "₺",
      TWD: "NT$",
      UAH: "₴",
      USD: "$",
      UYU: "$U",
      VES: "Bs.S",
      VND: "₫",
      ZAR: "R",
    }
    return symbols[this.currency_code] || this.currency_code
  }

  formatLocalPrice(): string {
    return `${this.currencySymbol}${this.local_price.toFixed(2)}`
  }

  formatDollarPrice(): string {
    return `$${this.dollarPrice.toFixed(2)}`
  }

  get flagEmoji(): string {
    const countryCodeA2 = {
      ARE: "AE", // United Arab Emirates
      ARG: "AR", // Argentina
      AUS: "AU", // Australia
      AUT: "AT", // Austria
      AZE: "AZ", // Azerbaijan
      BEL: "BE", // Belgium
      BHR: "BH", // Bahrain
      BRA: "BR", // Brazil
      CAN: "CA", // Canada
      CHE: "CH", // Switzerland
      CHL: "CL", // Chile
      CHN: "CN", // China
      COL: "CO", // Colombia
      CRI: "CR", // Costa Rica
      CZE: "CZ", // Czech Republic
      DEU: "DE", // Germany
      DNK: "DK", // Denmark
      EGY: "EG", // Egypt
      ESP: "ES", // Spain
      EST: "EE", // Estonia
      EUZ: "EU", // Euro area
      FIN: "FI", // Finland
      FRA: "FR", // France
      GBR: "GB", // Britain
      GRC: "GR", // Greece
      GTM: "GT", // Guatemala
      HKG: "HK", // Hong Kong
      HND: "HN", // Honduras
      HRV: "HR", // Croatia
      HUN: "HU", // Hungary
      IDN: "ID", // Indonesia
      IND: "IN", // India
      IRL: "IE", // Ireland
      ISR: "IL", // Israel
      ITA: "IT", // Italy
      JOR: "JO", // Jordan
      JPN: "JP", // Japan
      KOR: "KR", // South Korea
      KWT: "KW", // Kuwait
      LBN: "LB", // Lebanon
      LTU: "LT", // Lithuania
      LVA: "LV", // Latvia
      MDA: "MD", // Moldova
      MEX: "MX", // Mexico
      MYS: "MY", // Malaysia
      NIC: "NI", // Nicaragua
      NLD: "NL", // Netherlands
      NOR: "NO", // Norway
      NZL: "NZ", // New Zealand
      OMN: "OM", // Oman
      PAK: "PK", // Pakistan
      PER: "PE", // Peru
      PHL: "PH", // Philippines
      POL: "PL", // Poland
      PRT: "PT", // Portugal
      QAT: "QA", // Qatar
      ROU: "RO", // Romania
      SAU: "SA", // Saudi Arabia
      SGP: "SG", // Singapore
      SVK: "SK", // Slovakia
      SVN: "SI", // Slovenia
      SWE: "SE", // Sweden
      THA: "TH", // Thailand
      TUR: "TR", // Turkey
      UKR: "UA", // Ukraine
      URY: "UY", // Uruguay
      USA: "US", // United States
      VEN: "VE", // Venezuela
      VNM: "VN", // Vietnam
      ZAF: "ZA", // South Africa
    }[this.iso_a3]

    if (!countryCodeA2) {
      return "🌏"
    }

    // 将国家代码转换为区域指示符
    const codePoints = countryCodeA2
      .split("")
      .map((char) => 127397 + char.charCodeAt(0))

    return String.fromCodePoint(...codePoints)
  }

  // 添加新方法：计算相对于指定基准货币的汇率
  getExchangeRate(baseRecord: BigMacRecord): number {
    return this.dollarPrice / baseRecord.dollarPrice
  }

  // 计算指定金额在当前货币下的等值
  convertFromBase(baseRecord: BigMacRecord, amount: number): number {
    return amount * this.getExchangeRate(baseRecord)
  }

  // 格式化任意金额的显示
  formatAmount(amount: number): string {
    return `${this.currency_code} ${amount.toFixed(2)}`
  }
}

export async function getBigMacData(): Promise<Array<BigMacRecord>> {
  const response = await fetch("big-mac-index.json")
  const data = await response.json()
  return data.map(
    (item: any) =>
      new BigMacRecord(
        item.name,
        item.iso_a3,
        item.currency_code,
        item.local_price,
        item.dollar_ex,
        item.GDP_dollar,
        item.GDP_local,
        item.date
      )
  )
}
