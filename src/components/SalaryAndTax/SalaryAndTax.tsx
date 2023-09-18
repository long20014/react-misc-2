import React, { useState } from 'react';

function tinhBHXH(luong: number) {
  const maxLuongBHXH = 29800000;
  const tyLeBHXH = 0.105;
  if (luong < maxLuongBHXH) return maxLuongBHXH * tyLeBHXH;
  return luong * tyLeBHXH;
}

function tinhThueTNCN(luong: number, giamTru: number) {
  // TNCT = Thu Nhap Chiu Thue
  const TNCTBac1 = 5000000;
  const TNCTBac2 = 10000000;
  const TNCTBac3 = 18000000;
  const TNCTBac4 = 32000000;
  const TNCTBac5 = 50000000;
  const TNCTBac6 = 80000000;
  const TyLeTNCTBac1 = 0.05;
  const TyLeTNCTBac2 = 0.1;
  const TyLeTNCTBac3 = 0.15;
  const TyLeTNCTBac4 = 0.2;
  const TyLeTNCTBac5 = 0.25;
  const TyLeTNCTBac6 = 0.3;
  const TyLeTNCTBac7 = 0.35;
  const TNCT = luong - giamTru;

  if (TNCT < 0) return 0;

  if (TNCT < TNCTBac1) {
    const thueTNCNBac1 = TNCT * TyLeTNCTBac1;
    const thueTNCN = thueTNCNBac1;
    return thueTNCN;
  }
  if (TNCT < TNCTBac2) {
    const thueTNCNBac1 = TNCTBac1 * TyLeTNCTBac1;
    const thueTNCNBac2 = (TNCT - TNCTBac1) * TyLeTNCTBac2;
    const thueTNCN = thueTNCNBac1 + thueTNCNBac2;
    return thueTNCN;
  }
  if (TNCT < TNCTBac3) {
    const thueTNCNBac1 = TNCTBac1 * TyLeTNCTBac1;
    const thueTNCNBac2 = (TNCTBac2 - TNCTBac1) * TyLeTNCTBac2;
    const thueTNCNBac3 = (TNCT - TNCTBac2) * TyLeTNCTBac3;
    const thueTNCN = thueTNCNBac1 + thueTNCNBac2 + thueTNCNBac3;
    return thueTNCN;
  }
  if (TNCT < TNCTBac4) {
    const thueTNCNBac1 = TNCTBac1 * TyLeTNCTBac1;
    const thueTNCNBac2 = (TNCTBac2 - TNCTBac1) * TyLeTNCTBac2;
    const thueTNCNBac3 = (TNCTBac3 - TNCTBac2) * TyLeTNCTBac3;
    const thueTNCNBac4 = (TNCT - TNCTBac3) * TyLeTNCTBac4;
    const thueTNCN = thueTNCNBac1 + thueTNCNBac2 + thueTNCNBac3 + thueTNCNBac4;
    return thueTNCN;
  }
  if (TNCT < TNCTBac5) {
    const thueTNCNBac1 = TNCTBac1 * TyLeTNCTBac1;
    const thueTNCNBac2 = (TNCTBac2 - TNCTBac1) * TyLeTNCTBac2;
    const thueTNCNBac3 = (TNCTBac3 - TNCTBac2) * TyLeTNCTBac3;
    const thueTNCNBac4 = (TNCTBac4 - TNCTBac3) * TyLeTNCTBac4;
    const thueTNCNBac5 = (TNCT - TNCTBac4) * TyLeTNCTBac5;
    const thueTNCN = thueTNCNBac1 + thueTNCNBac2 + thueTNCNBac3 + thueTNCNBac4 + thueTNCNBac5;
    return thueTNCN;
  }
  if (TNCT < TNCTBac6) {
    const thueTNCNBac1 = TNCTBac1 * TyLeTNCTBac1;
    const thueTNCNBac2 = (TNCTBac2 - TNCTBac1) * TyLeTNCTBac2;
    const thueTNCNBac3 = (TNCTBac3 - TNCTBac2) * TyLeTNCTBac3;
    const thueTNCNBac4 = (TNCTBac4 - TNCTBac3) * TyLeTNCTBac4;
    const thueTNCNBac5 = (TNCTBac5 - TNCTBac4) * TyLeTNCTBac5;
    const thueTNCNBac6 = (TNCT - TNCTBac5) * TyLeTNCTBac6;
    const thueTNCN = thueTNCNBac1 + thueTNCNBac2 + thueTNCNBac3 + thueTNCNBac4 + thueTNCNBac5 + thueTNCNBac6;
    return thueTNCN;
  }
  const thueTNCNBac1 = TNCTBac1 * TyLeTNCTBac1;
  const thueTNCNBac2 = (TNCTBac2 - TNCTBac1) * TyLeTNCTBac2;
  const thueTNCNBac3 = (TNCTBac3 - TNCTBac2) * TyLeTNCTBac3;
  const thueTNCNBac4 = (TNCTBac4 - TNCTBac3) * TyLeTNCTBac4;
  const thueTNCNBac5 = (TNCTBac5 - TNCTBac4) * TyLeTNCTBac5;
  const thueTNCNBac6 = (TNCTBac6 - TNCTBac5) * TyLeTNCTBac6;
  const thueTNCNBac7 = (TNCT - TNCTBac6) * TyLeTNCTBac7;
  const thueTNCN =
    thueTNCNBac1 + thueTNCNBac2 + thueTNCNBac3 + thueTNCNBac4 + thueTNCNBac5 + thueTNCNBac6 + thueTNCNBac7;
  return thueTNCN;
}

const SalaryAndTax = (props: any) => {
  // const [soNguoiPhuThuoc, setSoNguoiPhuThuoc] = useState(2);
  // const [giamTruGiaCanh, setGiamTruGiaCanh] = useState(11000000 + soNguoiPhuThuoc * 4400000);
  const [luongGross, setLuongGross] = useState(0);
  // const [bhxh, setBhxh] = useState(tinhBHXH(luongGross));
  // const [giamTru, setGiamTru] = useState(giamTruGiaCanh + bhxh);
  const [thueTNCN, setThueTNCN] = useState(0);
  const [luongNet, setLuongNet] = useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const soNguoiPhuThuoc = 2;
    const giamTruGiaCanh = 11000000 + soNguoiPhuThuoc * 4400000;
    const bhxh = tinhBHXH(luongGross);
    const giamTru = giamTruGiaCanh + bhxh;
    const thue = tinhThueTNCN(luongGross, giamTru);
    const luong = luongGross - bhxh - thue;
    setThueTNCN(thue);
    setLuongNet(luong);
  };

  return (
    <div>
      <h2>Tính lương net và thuế TNCN</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="luongGross">Lương gross </label>
        <input type="number" name="luongGross" id="luongGross" onChange={(e) => setLuongGross(+e.target.value)} />
        <input type="submit" value="Submit"></input>
      </form>
      <ul>
        <li>Thuế TNCN: {thueTNCN}</li>
        <li>Lương Net: {luongNet}</li>
      </ul>
    </div>
  );
};

export default SalaryAndTax;
