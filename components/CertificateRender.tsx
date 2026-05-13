import React from 'react';
import { Certificate } from '../types';
import { ICQA_NAME } from '../constants';

interface Props {
  data: Certificate;
  isPreview?: boolean;
}

interface FieldRowProps {
  label: string;
  value: string;
  top: number;
  labelX: number;
  valueX: number;
  valueWidth: string;
  valueSize: string;
  valueClassName: string;
}

const FieldRow: React.FC<FieldRowProps> = ({ label, value, top, labelX, valueX, valueWidth, valueSize, valueClassName }) => (
  <>
    <div className="absolute z-[10]" style={{ top: `${top}px`, left: `${labelX}px` }}>
      <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: '26px' }}>{label}</span>
    </div>
    <div className="absolute z-[10]" style={{ top: `${top}px`, left: `${valueX}px`, width: valueWidth, height: 'auto' }}>
      <span className={valueClassName} style={{ fontSize: valueSize, lineHeight: '1.2' }}>{value}</span>
    </div>
  </>
);

export const CertificateRender: React.FC<Props> = ({ data }) => {
  const BASE_WIDTH = 2480;
  const BASE_HEIGHT = 1748;
  const LABEL_X = 400;
  const VALUE_X = 800;
  const FONT_VALUE = '28px';
  const FONT_NAME = '36px';
  const FONT_ICQA = '32px';
  const FONT_PARAGRAPH = '35px';
  const MAX_TEXT_WIDTH = '760px';
  const START_Y = 520;
  const ROW_STEP = 50;
  const rows = Array.from({ length: 10 }, (_, index) => START_Y + ROW_STEP * index);

  return (
    <div
      className="relative bg-white shadow-2xl overflow-hidden print:shadow-none print:m-0 mx-auto select-none"
      style={{
        width: `${BASE_WIDTH}px`,
        height: `${BASE_HEIGHT}px`,
        fontSmooth: 'always',
        WebkitFontSmoothing: 'antialiased'
      }}
    >
      <div className="absolute inset-0 z-[0]">
        <img src="/certificate_bg.png" alt="Certificate background" className="w-full h-full object-cover" />
      </div>

      <FieldRow label="ICQA Number:" value={data.kcqaNumber} top={rows[0]} valueWidth="500px" valueSize={FONT_ICQA} valueClassName="font-serif font-bold text-kcqa-red block" labelX={LABEL_X} valueX={VALUE_X} />
      <FieldRow label="Full Name:" value={data.name} top={rows[1]} valueWidth={MAX_TEXT_WIDTH} valueSize={FONT_NAME} valueClassName="font-serif font-bold text-black uppercase truncate block" labelX={LABEL_X} valueX={VALUE_X} />
      <FieldRow label="Registry Number:" value={data.ncqaNumber} top={rows[2]} valueWidth="500px" valueSize={FONT_VALUE} valueClassName="font-serif font-bold text-black block" labelX={LABEL_X} valueX={VALUE_X} />
      <FieldRow label="Qualification Type:" value={data.qualificationType} top={rows[3]} valueWidth={MAX_TEXT_WIDTH} valueSize={FONT_VALUE} valueClassName="font-serif font-bold text-black truncate block" labelX={LABEL_X} valueX={VALUE_X} />
      <FieldRow label="Issue Date:" value={data.issueDate} top={rows[4]} valueWidth="500px" valueSize={FONT_VALUE} valueClassName="font-serif font-bold text-black block" labelX={LABEL_X} valueX={VALUE_X} />
      <FieldRow label="Education Provider:" value={data.eduDept} top={rows[5]} valueWidth={MAX_TEXT_WIDTH} valueSize={FONT_VALUE} valueClassName="font-serif font-bold text-black block line-clamp-1" labelX={LABEL_X} valueX={VALUE_X} />
      <FieldRow label="Issuing Office:" value={data.issuingOffice} top={rows[6]} valueWidth={MAX_TEXT_WIDTH} valueSize={FONT_VALUE} valueClassName="font-serif font-bold text-black block line-clamp-1" labelX={LABEL_X} valueX={VALUE_X} />
      <FieldRow label="Issuing Country:" value={data.issuingCountry} top={rows[7]} valueWidth="500px" valueSize={FONT_VALUE} valueClassName="font-serif font-bold text-black block" labelX={LABEL_X} valueX={VALUE_X} />
      <FieldRow label="Expiration Date:" value={data.expirationDate || 'N/A'} top={rows[8]} valueWidth="500px" valueSize={FONT_VALUE} valueClassName="font-serif font-bold text-black block" labelX={LABEL_X} valueX={VALUE_X} />
      <FieldRow label="Verified By:" value={ICQA_NAME} top={rows[9]} valueWidth={MAX_TEXT_WIDTH} valueSize={FONT_VALUE} valueClassName="font-serif font-extrabold text-black block tracking-tight" labelX={LABEL_X} valueX={VALUE_X} />

      <div className="absolute z-[20] bg-gray-50 flex items-center justify-center overflow-hidden" style={{ top: `${rows[1]}px`, left: '1660px', width: '420px', height: '430px' }}>
        {data.photoUrl ? (
          <img src={data.photoUrl} alt="Recipient portrait" className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-300 text-2xl font-sans p-4 text-center">Photo Area</div>
        )}
      </div>

      <div className="absolute z-[10] text-center font-serif text-gray-700" style={{ top: '1040px', left: '400px', width: '1680px', height: '450px', fontSize: FONT_PARAGRAPH, lineHeight: '1.5', overflow: 'hidden' }}>
        <p className="mb-4">
          This certifies that the individual named above has successfully met the qualification standards and assessment requirements recognized by the International Civil Qualification Association and is hereby recorded as an approved credential holder in good standing.
        </p>
      </div>
    </div>
  );
};
