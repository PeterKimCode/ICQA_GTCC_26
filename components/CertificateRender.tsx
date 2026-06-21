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

const formatCertificateDate = (value: string): string => {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    return `${day} ${months[Number(month) - 1]} ${year}`;
  }

  const displayMatch = value.match(/^([A-Z]{3}) (\d{2}), (\d{4})$/);
  if (displayMatch) {
    const [, month, day, year] = displayMatch;
    return `${day} ${month} ${year}`;
  }

  return value;
};

export const CertificateRender: React.FC<Props> = ({ data }) => {
  const BASE_WIDTH = 2480;
  const BASE_HEIGHT = 1748;
  const LABEL_X = 400;
  const VALUE_X = 800;
  const FONT_VALUE = '26px';
  const FONT_NAME = '33px';
  const FONT_ICQA = '30px';
  const FONT_PARAGRAPH = '28px';
  const MAX_TEXT_WIDTH = '840px';
  const START_Y = 485;
  const ROW_STEP = 42;
  const rows = Array.from({ length: 11 }, (_, index) => START_Y + ROW_STEP * index);

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
      <FieldRow label="Name:" value={data.name} top={rows[1]} valueWidth={MAX_TEXT_WIDTH} valueSize={FONT_NAME} valueClassName="font-serif font-bold text-black uppercase truncate block" labelX={LABEL_X} valueX={VALUE_X} />
      <FieldRow label="Date of Birth:" value={formatCertificateDate(data.dob)} top={rows[2]} valueWidth="500px" valueSize={FONT_VALUE} valueClassName="font-serif font-bold text-black block" labelX={LABEL_X} valueX={VALUE_X} />
      <FieldRow label="Certification Number:" value={data.ncqaNumber} top={rows[3]} valueWidth="500px" valueSize={FONT_VALUE} valueClassName="font-serif font-bold text-black block" labelX={LABEL_X} valueX={VALUE_X} />
      <FieldRow label="Qualification type:" value={data.qualificationType} top={rows[4]} valueWidth={MAX_TEXT_WIDTH} valueSize={FONT_VALUE} valueClassName="font-serif font-bold text-black truncate block" labelX={LABEL_X} valueX={VALUE_X} />
      <FieldRow label="Date Issue:" value={formatCertificateDate(data.issueDate)} top={rows[5]} valueWidth="500px" valueSize={FONT_VALUE} valueClassName="font-serif font-bold text-black block" labelX={LABEL_X} valueX={VALUE_X} />
      <FieldRow label="Education Department:" value={data.eduDept} top={rows[6]} valueWidth={MAX_TEXT_WIDTH} valueSize={FONT_VALUE} valueClassName="font-serif font-bold text-black block line-clamp-1" labelX={LABEL_X} valueX={VALUE_X} />
      <FieldRow label="Issuing Office:" value={data.issuingOffice} top={rows[7]} valueWidth={MAX_TEXT_WIDTH} valueSize={FONT_VALUE} valueClassName="font-serif font-bold text-black block line-clamp-1" labelX={LABEL_X} valueX={VALUE_X} />
      <FieldRow label="Issuing country:" value={data.issuingCountry} top={rows[8]} valueWidth="500px" valueSize={FONT_VALUE} valueClassName="font-serif font-bold text-black block" labelX={LABEL_X} valueX={VALUE_X} />
      <FieldRow label="Expiration Date:" value={data.expirationDate ? formatCertificateDate(data.expirationDate) : 'N/A'} top={rows[9]} valueWidth="500px" valueSize={FONT_VALUE} valueClassName="font-serif font-bold text-black block" labelX={LABEL_X} valueX={VALUE_X} />
      <FieldRow label="Verified Body:" value={ICQA_NAME} top={rows[10]} valueWidth={MAX_TEXT_WIDTH} valueSize={FONT_VALUE} valueClassName="font-serif font-extrabold text-black block tracking-tight" labelX={LABEL_X} valueX={VALUE_X} />

      <div className="absolute z-[20] bg-gray-50 flex items-center justify-center overflow-hidden" style={{ top: `${rows[1]}px`, left: '1660px', width: '420px', height: '430px' }}>
        {data.photoUrl ? (
          <img src={data.photoUrl} alt="Recipient portrait" className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-300 text-2xl font-sans p-4 text-center">Photo Area</div>
        )}
      </div>

      <div className="absolute z-[10] text-center font-serif text-gray-500" style={{ top: `${rows[1] + 438}px`, left: '1660px', width: '420px', fontSize: '22px' }}>
        icqa.us
      </div>

      <div className="absolute z-[10] text-center font-serif text-gray-700" style={{ top: '990px', left: '300px', width: '1880px', height: '190px', fontSize: FONT_PARAGRAPH, lineHeight: '1.28', overflow: 'hidden' }}>
        <p className="mb-4 first-letter:text-[52px] first-letter:leading-none">
          The above-mentioned person has obtained the certificate stated above by passing the Domestic qualification examination, and it is hereby confirmed that, after passing the document review conducted by the International Certification & Qualification Association, the said qualification has been converted into an international qualification and is officially recognized and managed.
        </p>
      </div>
    </div>
  );
};
