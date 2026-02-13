import React from 'react';
import { Certificate } from '../types';
import { ICQA_NAME } from '../constants';

interface Props {
  data: Certificate;
  isPreview?: boolean;
}

export const CertificateRender: React.FC<Props> = ({ data, isPreview = false }) => {
  // 1. Base Premise: 2480 x 1748 px (300 DPI A4 Landscape-ish)
  const BASE_WIDTH = 2480;
  const BASE_HEIGHT = 1748;

  // --- COORDINATE CONFIGURATION (Anchor: Top-Left) ---
  // Adjusted to equalize margins: (2480 - 1680) / 2 = 400px margin on each side.
  const LABEL_X = 400;
  const VALUE_X = 800;

  // --- FONT SIZING UPDATES ---
  // Increased by ~2px (1 step) as requested
  const FONT_LABEL = "26px";
  const FONT_VALUE = "28px";
  const FONT_NAME = "36px";
  const FONT_ICQA = "32px";
  const FONT_PARAGRAPH = "35px";

  // Line Height / Spacing
  const LEADING_NORMAL = "30px";
  const LEADING_DOUBLE = "34px";

  // Max width for fields - Reduced to 760px to avoid hitting the photo at x=1660
  const MAX_TEXT_WIDTH = '760px';

  // --- COMPACT ROW POSITIONS ---
  // Uniform spacing for ALL rows to ensure consistent padding
  const START_Y = 420;
  const ROW_STEP = 44; // Uniform gap

  const ROW_1_Y = START_Y;                // 420
  const ROW_2_Y = START_Y + ROW_STEP * 1; // 464
  const ROW_3_Y = START_Y + ROW_STEP * 2; // 508
  const ROW_4_Y = START_Y + ROW_STEP * 3; // 552
  const ROW_5_Y = START_Y + ROW_STEP * 4; // 596
  const ROW_6_Y = START_Y + ROW_STEP * 5; // 640
  const ROW_7_Y = START_Y + ROW_STEP * 6; // 684
  const ROW_8_Y = START_Y + ROW_STEP * 7; // 728
  const ROW_9_Y = START_Y + ROW_STEP * 8; // 772
  const ROW_10_Y = START_Y + ROW_STEP * 9; // 816

  return (
    <div
      className={`relative bg-white shadow-2xl overflow-hidden print:shadow-none print:m-0 mx-auto select-none`}
      style={{
        width: `${BASE_WIDTH}px`,
        height: `${BASE_HEIGHT}px`,
        fontSmooth: 'always',
        WebkitFontSmoothing: 'antialiased'
      }}
    >
      {/* ------------------------------------------------------------
          1. BACKGROUND ZONE (Z-Index: 0)
      ------------------------------------------------------------ */}
      <div className="absolute inset-0 z-[0]">
        <img
          src="/certificate_bg.png"
          alt="Certificate Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ------------------------------------------------------------
          2. FIELD ZONE (Z-Index: 10)
          Compacted Layout
      ------------------------------------------------------------ */}

      {/* Row 1: ICQA Number (Red) */}
      <div className="absolute z-[10]" style={{ top: `${ROW_1_Y}px`, left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>ICQA Number :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: `${ROW_1_Y}px`, left: `${VALUE_X}px`, width: '500px', height: '34px' }}>
        <span className="font-serif font-bold text-icqa-red block" style={{ fontSize: FONT_ICQA, lineHeight: LEADING_NORMAL }}>
          {data.icqaNumber}
        </span>
      </div>

      {/* Row 2: Name (Black, Bold) */}
      <div className="absolute z-[10]" style={{ top: `${ROW_2_Y}px`, left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>Name :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: `${ROW_2_Y}px`, left: `${VALUE_X}px`, width: MAX_TEXT_WIDTH, height: '34px' }}>
        <span className="font-serif font-bold text-black uppercase truncate block" style={{ fontSize: FONT_NAME, lineHeight: LEADING_NORMAL }}>
          {data.name}
        </span>
      </div>

      {/* Row 3: Civil Qualification Number (Black) */}
      <div className="absolute z-[10]" style={{ top: `${ROW_3_Y}px`, left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>Civil Qualification Number :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: `${ROW_3_Y}px`, left: `${VALUE_X}px`, width: '500px', height: '34px' }}>
        <span className="font-serif font-bold text-black block" style={{ fontSize: FONT_VALUE, lineHeight: LEADING_NORMAL }}>
          {data.ncqaNumber}
        </span>
      </div>

      {/* Row 4: Qualification Type (Black) */}
      <div className="absolute z-[10]" style={{ top: `${ROW_4_Y}px`, left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>Qualification type :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: `${ROW_4_Y}px`, left: `${VALUE_X}px`, width: MAX_TEXT_WIDTH, height: '34px' }}>
        <span className="font-serif font-bold text-black truncate block" style={{ fontSize: FONT_VALUE, lineHeight: LEADING_NORMAL }}>
          {data.qualificationType}
        </span>
      </div>

      {/* Row 5: Date Issue (Black) */}
      <div className="absolute z-[10]" style={{ top: `${ROW_5_Y}px`, left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>Date Issue :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: `${ROW_5_Y}px`, left: `${VALUE_X}px`, width: '500px', height: '34px' }}>
        <span className="font-serif font-bold text-black block" style={{ fontSize: FONT_VALUE, lineHeight: LEADING_NORMAL }}>
          {data.issueDate}
        </span>
      </div>

      {/* Row 6: Education Dept (Black) */}
      <div className="absolute z-[10]" style={{ top: `${ROW_6_Y}px`, left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>Education Department :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: `${ROW_6_Y}px`, left: `${VALUE_X}px`, width: MAX_TEXT_WIDTH, height: '40px' }}>
        <span className="font-serif font-bold text-black block line-clamp-1" style={{ fontSize: FONT_VALUE, lineHeight: LEADING_NORMAL }}>
          {data.eduDept}
        </span>
      </div>

      {/* Row 7: Issuing Office (Black) */}
      <div className="absolute z-[10]" style={{ top: `${ROW_7_Y}px`, left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>Issuing Office :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: `${ROW_7_Y}px`, left: `${VALUE_X}px`, width: MAX_TEXT_WIDTH, height: '40px' }}>
        <span className="font-serif font-bold text-black block line-clamp-1" style={{ fontSize: FONT_VALUE, lineHeight: LEADING_NORMAL }}>
          {data.issuingOffice}
        </span>
      </div>

      {/* Row 8: Issuing Country (Black) */}
      <div className="absolute z-[10]" style={{ top: `${ROW_8_Y}px`, left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>Issuing Country :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: `${ROW_8_Y}px`, left: `${VALUE_X}px`, width: '500px', height: '34px' }}>
        <span className="font-serif font-bold text-black block" style={{ fontSize: FONT_VALUE, lineHeight: LEADING_NORMAL }}>
          {data.issuingCountry}
        </span>
      </div>

      {/* Row 9: Expiration Date (Black) */}
      <div className="absolute z-[10]" style={{ top: `${ROW_9_Y}px`, left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>Expiration Date :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: `${ROW_9_Y}px`, left: `${VALUE_X}px`, width: '500px', height: '34px' }}>
        <span className="font-serif font-bold text-black block" style={{ fontSize: FONT_VALUE, lineHeight: LEADING_NORMAL }}>
          {data.expirationDate || 'N/A'}
        </span>
      </div>

      {/* Row 10: Verified Body (Black) */}
      <div className="absolute z-[10]" style={{ top: `${ROW_10_Y}px`, left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>Verified Body :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: `${ROW_10_Y}px`, left: `${VALUE_X}px`, width: MAX_TEXT_WIDTH, height: '34px' }}>
        <span className="font-serif font-extrabold text-black block tracking-tight" style={{ fontSize: FONT_VALUE, lineHeight: LEADING_NORMAL }}>
          {ICQA_NAME}
        </span>
      </div>


      {/* ------------------------------------------------------------
          3. PHOTO ZONE (Z-Index: 20)
          y: 464 (Starts at Row 2 Name), w: 420, h: 430 (Ends at y=894 approx)
          Shifted x from 1600 to 1660
      ------------------------------------------------------------ */}
      <div
        className="absolute z-[20] bg-gray-50 flex items-center justify-center overflow-hidden"
        style={{ top: '464px', left: '1660px', width: '420px', height: '430px' }}
      >
        {data.photoUrl ? (
          <img src={data.photoUrl} alt="Recipient" className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-300 text-2xl font-sans p-4 text-center">Photo Area</div>
        )}
      </div>


      {/* ------------------------------------------------------------
          4. PARAGRAPH (BODY) ZONE (Z-Index: 10)
          Moved to 960px to clear the Photo (which ends at 940px)
          Width matched to content boundaries:
            Left: 400px (Label X)
            Right: 2080px (Photo end: 1660 + 420)
            Total Width: 1680px
          Height increased to 450px to prevent truncation
      ------------------------------------------------------------ */}
      <div
        className="absolute z-[10] text-center font-serif text-gray-700"
        style={{
          top: '960px',
          left: '400px',
          width: '1680px',
          height: '450px',
          fontSize: FONT_PARAGRAPH,
          lineHeight: '1.5',
          overflow: 'hidden'
        }}
      >
        <p className="mb-4">
          The above person obtains this certificate by passing the domestic private qualification test and confirms that the obtained private qualification after passing the document examination by the <strong>{ICQA_NAME}</strong> has been replaced with the international private certificate and is being qualified and managed.
        </p>
      </div>

    </div>
  );
};