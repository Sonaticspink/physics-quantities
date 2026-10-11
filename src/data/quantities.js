// ข้อมูลจากไฟล์ต้นฉบับ chakkrit_tanoi-export-20261011T013605.html (32 ปริมาณ)
// คอลัมน์ dimMLT / dimFLT เป็นข้อมูลที่เพิ่มเข้ามา (คำนวณจากนิยามหน่วย SI ด้วยพีชคณิตมิติ) ไม่มีในไฟล์ต้นฉบับ
export const QUANTITIES = [
  {
    "id": "acceleration",
    "en": "Acceleration",
    "th": "ความเร่ง",
    "meaning": "ความเร่ง: อัตราการเปลี่ยนแปลงของความเร็ว",
    "symbols": [
      "a"
    ],
    "unit": "m/s²",
    "unitRaw": "\\text{m/s}^2",
    "dimMLT": "L T⁻²",
    "dimFLT": "L T⁻²",
    "cat": "motion"
  },
  {
    "id": "angle",
    "en": "Angle",
    "th": "มุม",
    "meaning": "มุม",
    "symbols": [
      "θ",
      "φ"
    ],
    "unit": "rad",
    "unitRaw": "เรเดียน (rad)",
    "dimMLT": "1",
    "dimFLT": "1",
    "cat": "motion"
  },
  {
    "id": "angular_acceleration",
    "en": "Angular acceleration",
    "th": "ความเร่งเชิงมุม",
    "meaning": "ความเร่งเชิงมุม: อัตราการเปลี่ยนแปลงความเร็วเชิงมุม",
    "symbols": [
      "α"
    ],
    "unit": "rad/s²",
    "unitRaw": "rad/s²",
    "dimMLT": "T⁻²",
    "dimFLT": "T⁻²",
    "cat": "motion"
  },
  {
    "id": "angular_velocity",
    "en": "Angular velocity",
    "th": "ความเร็วเชิงมุม",
    "meaning": "ความเร็วเชิงมุม",
    "symbols": [
      "ω"
    ],
    "unit": "rad/s",
    "unitRaw": "rad/s",
    "dimMLT": "T⁻¹",
    "dimFLT": "T⁻¹",
    "cat": "motion"
  },
  {
    "id": "area",
    "en": "Area",
    "th": "พื้นที่",
    "meaning": "พื้นที่",
    "symbols": [
      "A"
    ],
    "unit": "m²",
    "unitRaw": "ตารางเมตร (m²)",
    "dimMLT": "L²",
    "dimFLT": "L²",
    "cat": "motion"
  },
  {
    "id": "density",
    "en": "Density",
    "th": "ความหนาแน่น",
    "meaning": "ความหนาแน่น: มวลต่อหนึ่งหน่วยปริมาตร",
    "symbols": [
      "ρ"
    ],
    "unit": "kg/m³",
    "unitRaw": "กิโลกรัมต่อลูกบาศก์เมตร (kg/m³)",
    "dimMLT": "M L⁻³",
    "dimFLT": "F L⁻⁴ T²",
    "cat": "fluids"
  },
  {
    "id": "energy",
    "en": "Energy",
    "th": "พลังงาน",
    "meaning": "พลังงาน: ความสามารถในการทำงาน",
    "symbols": [
      "E",
      "U"
    ],
    "unit": "J",
    "unitRaw": "จูล (J) = kg·m²/s²",
    "dimMLT": "M L² T⁻²",
    "dimFLT": "F L",
    "cat": "dynamics"
  },
  {
    "id": "force",
    "en": "Force",
    "th": "แรง",
    "meaning": "แรง: สิ่งที่ทำให้วัตถุเปลี่ยนการเคลื่อนที่/รูปร่าง",
    "symbols": [
      "F"
    ],
    "unit": "N",
    "unitRaw": "นิวตัน (N) = kg·m/s²",
    "dimMLT": "M L T⁻²",
    "dimFLT": "F",
    "cat": "dynamics"
  },
  {
    "id": "frequency",
    "en": "Frequency",
    "th": "ความถี่",
    "meaning": "ความถี่: จำนวนรอบหรือการสั่นต่อวินาที",
    "symbols": [
      "f",
      "ν"
    ],
    "unit": "Hz",
    "unitRaw": "เฮิรตซ์ (Hz) = s⁻¹",
    "dimMLT": "T⁻¹",
    "dimFLT": "T⁻¹",
    "cat": "dynamics"
  },
  {
    "id": "heat",
    "en": "Heat",
    "th": "ความร้อน",
    "meaning": "ความร้อน: พลังงานที่ถ่ายเทเพราะอุณหภูมิต่างกัน",
    "symbols": [
      "Q"
    ],
    "unit": "J",
    "unitRaw": "จูล (J)",
    "dimMLT": "M L² T⁻²",
    "dimFLT": "F L",
    "cat": "thermal"
  },
  {
    "id": "length",
    "en": "Length",
    "th": "ความยาว/ระยะทาง",
    "meaning": "ความยาวหรือระยะทาง",
    "symbols": [
      "l",
      "x",
      "s",
      "r"
    ],
    "unit": "m",
    "unitRaw": "เมตร (m)",
    "dimMLT": "L",
    "dimFLT": "L",
    "cat": "motion"
  },
  {
    "id": "mass",
    "en": "Mass",
    "th": "มวล",
    "meaning": "มวล: ปริมาณสสาร/ความเฉื่อยของวัตถุ",
    "symbols": [
      "m"
    ],
    "unit": "kg",
    "unitRaw": "กิโลกรัม (kg)",
    "dimMLT": "M",
    "dimFLT": "F L⁻¹ T²",
    "cat": "dynamics"
  },
  {
    "id": "modulus_of_elasticity",
    "en": "Modulus of elasticity",
    "th": "มอดูลัสยืดหยุ่น",
    "meaning": "มอดูลัสยืดหยุ่น: บอกความต้านทานต่อการเปลี่ยนรูปแบบยืดหยุ่น",
    "symbols": [
      "E",
      "Y"
    ],
    "unit": "Pa",
    "unitRaw": "ปาสคาล (Pa) = N/m²",
    "dimMLT": "M L⁻¹ T⁻²",
    "dimFLT": "F L⁻²",
    "cat": "materials"
  },
  {
    "id": "moment_of_a_force",
    "en": "Moment of a force",
    "th": "โมเมนต์ของแรง/แรงบิด",
    "meaning": "โมเมนต์ของแรง หรือแรงบิด: ผลของแรงที่ทำให้วัตถุหมุน",
    "symbols": [
      "M",
      "τ"
    ],
    "unit": "N·m",
    "unitRaw": "นิวตัน·เมตร (N·m)",
    "dimMLT": "M L² T⁻²",
    "dimFLT": "F L",
    "cat": "dynamics"
  },
  {
    "id": "moment_of_inertia_area",
    "en": "Moment of inertia (area)",
    "th": "โมเมนต์ความเฉื่อยของพื้นที่",
    "meaning": "โมเมนต์ความเฉื่อยของพื้นที่: บอกการกระจายพื้นที่รอบแกน ใช้ในวิชากลศาสตร์วัสดุ",
    "symbols": [
      "I",
      "I_x",
      "I_y"
    ],
    "unit": "m⁴",
    "unitRaw": "เมตรยกกำลังสี่ (m⁴)",
    "dimMLT": "L⁴",
    "dimFLT": "L⁴",
    "cat": "materials"
  },
  {
    "id": "moment_of_inertia_mass",
    "en": "Moment of inertia (mass)",
    "th": "โมเมนต์ความเฉื่อยของมวล",
    "meaning": "โมเมนต์ความเฉื่อยของมวล: ความต้านทานต่อการหมุน",
    "symbols": [
      "I"
    ],
    "unit": "kg·m²",
    "unitRaw": "kg·m²",
    "dimMLT": "M L²",
    "dimFLT": "F L T²",
    "cat": "dynamics"
  },
  {
    "id": "momentum",
    "en": "Momentum",
    "th": "โมเมนตัม",
    "meaning": "โมเมนตัม: มวลคูณความเร็ว",
    "symbols": [
      "p"
    ],
    "unit": "kg·m/s",
    "unitRaw": "kg·m/s หรือ N·s",
    "dimMLT": "M L T⁻¹",
    "dimFLT": "F T",
    "cat": "dynamics"
  },
  {
    "id": "power",
    "en": "Power",
    "th": "กำลัง",
    "meaning": "กำลัง: อัตราการทำงานหรือใช้พลังงานต่อเวลา",
    "symbols": [
      "P"
    ],
    "unit": "W",
    "unitRaw": "วัตต์ (W) = J/s",
    "dimMLT": "M L² T⁻³",
    "dimFLT": "F L T⁻¹",
    "cat": "dynamics"
  },
  {
    "id": "pressure",
    "en": "Pressure",
    "th": "ความดัน",
    "meaning": "ความดัน: แรงตั้งฉากต่อหนึ่งหน่วยพื้นที่",
    "symbols": [
      "p",
      "P"
    ],
    "unit": "Pa",
    "unitRaw": "ปาสคาล (Pa) = N/m²",
    "dimMLT": "M L⁻¹ T⁻²",
    "dimFLT": "F L⁻²",
    "cat": "fluids"
  },
  {
    "id": "specific_heat",
    "en": "Specific heat",
    "th": "ความร้อนจำเพาะ",
    "meaning": "ความร้อนจำเพาะ: พลังงานความร้อนที่ทำให้อุณหภูมิของสารมวล 1 kg เปลี่ยนไป 1 K",
    "symbols": [
      "c"
    ],
    "unit": "J/(kg·K)",
    "unitRaw": "J/(kg·K)",
    "dimMLT": "L² T⁻² Θ⁻¹",
    "dimFLT": "L² T⁻² Θ⁻¹",
    "cat": "thermal"
  },
  {
    "id": "specific_weight",
    "en": "Specific weight",
    "th": "น้ำหนักจำเพาะ",
    "meaning": "น้ำหนักจำเพาะ: น้ำหนักต่อหนึ่งหน่วยปริมาตร",
    "symbols": [
      "γ"
    ],
    "unit": "N/m³",
    "unitRaw": "N/m³",
    "dimMLT": "M L⁻² T⁻²",
    "dimFLT": "F L⁻³",
    "cat": "fluids"
  },
  {
    "id": "strain",
    "en": "Strain",
    "th": "ความเครียด",
    "meaning": "ความเครียด: อัตราส่วนการเปลี่ยนความยาวต่อความยาวเดิม",
    "symbols": [
      "ε"
    ],
    "unit": "ไม่มีหน่วย",
    "unitRaw": "ไม่มีหน่วย (m/m)",
    "dimMLT": "1",
    "dimFLT": "1",
    "cat": "materials"
  },
  {
    "id": "stress",
    "en": "Stress",
    "th": "ความเค้น",
    "meaning": "ความเค้น: แรงภายในต่อพื้นที่หน้าตัด",
    "symbols": [
      "σ",
      "τ"
    ],
    "unit": "Pa",
    "unitRaw": "Pa = N/m²",
    "dimMLT": "M L⁻¹ T⁻²",
    "dimFLT": "F L⁻²",
    "cat": "materials"
  },
  {
    "id": "surface_tension",
    "en": "Surface tension",
    "th": "แรงตึงผิว",
    "meaning": "แรงตึงผิว: แรงตามแนวผิวของของเหลวต่อความยาว",
    "symbols": [
      "γ",
      "σ"
    ],
    "unit": "N/m",
    "unitRaw": "N/m",
    "dimMLT": "M T⁻²",
    "dimFLT": "F L⁻¹",
    "cat": "fluids"
  },
  {
    "id": "temperature",
    "en": "Temperature",
    "th": "อุณหภูมิ",
    "meaning": "อุณหภูมิ",
    "symbols": [
      "T"
    ],
    "unit": "K",
    "unitRaw": "เคลวิน (K)",
    "dimMLT": "Θ",
    "dimFLT": "Θ",
    "cat": "thermal"
  },
  {
    "id": "time",
    "en": "Time",
    "th": "เวลา",
    "meaning": "เวลา",
    "symbols": [
      "t"
    ],
    "unit": "s",
    "unitRaw": "วินาที (s)",
    "dimMLT": "T",
    "dimFLT": "T",
    "cat": "motion"
  },
  {
    "id": "torque",
    "en": "Torque",
    "th": "แรงบิด",
    "meaning": "แรงบิด: โมเมนต์ที่ทำให้เกิดการหมุน",
    "symbols": [
      "τ"
    ],
    "unit": "N·m",
    "unitRaw": "N·m",
    "dimMLT": "M L² T⁻²",
    "dimFLT": "F L",
    "cat": "dynamics"
  },
  {
    "id": "velocity",
    "en": "Velocity",
    "th": "ความเร็ว",
    "meaning": "ความเร็ว: การเปลี่ยนตำแหน่งต่อเวลา มีทิศทาง",
    "symbols": [
      "v⃗",
      "v"
    ],
    "unit": "m/s",
    "unitRaw": "m/s",
    "dimMLT": "L T⁻¹",
    "dimFLT": "L T⁻¹",
    "cat": "motion"
  },
  {
    "id": "viscosity_dynamic",
    "en": "Viscosity (dynamic)",
    "th": "ความหนืดไดนามิก",
    "meaning": "ความหนืดไดนามิก: ความต้านทานการไหลของของไหล",
    "symbols": [
      "μ"
    ],
    "unit": "Pa·s",
    "unitRaw": "Pa·s = kg/(m·s)",
    "dimMLT": "M L⁻¹ T⁻¹",
    "dimFLT": "F L⁻² T",
    "cat": "fluids"
  },
  {
    "id": "viscosity_kinematic",
    "en": "Viscosity (kinematic)",
    "th": "ความหนืดจลน์",
    "meaning": "ความหนืดจลน์: ความหนืดไดนามิกหารด้วยความหนาแน่น",
    "symbols": [
      "ν"
    ],
    "unit": "m²/s",
    "unitRaw": "m²/s",
    "dimMLT": "L² T⁻¹",
    "dimFLT": "L² T⁻¹",
    "cat": "fluids"
  },
  {
    "id": "volume",
    "en": "Volume",
    "th": "ปริมาตร",
    "meaning": "ปริมาตร",
    "symbols": [
      "V"
    ],
    "unit": "m³",
    "unitRaw": "ลูกบาศก์เมตร (m³)",
    "dimMLT": "L³",
    "dimFLT": "L³",
    "cat": "motion"
  },
  {
    "id": "work",
    "en": "Work",
    "th": "งาน",
    "meaning": "งาน: พลังงานที่แรงถ่ายทอดเมื่อวัตถุเคลื่อนที่",
    "symbols": [
      "W"
    ],
    "unit": "J",
    "unitRaw": "จูล (J) = N·m",
    "dimMLT": "M L² T⁻²",
    "dimFLT": "F L",
    "cat": "dynamics"
  }
];
export const CATEGORIES = {
  motion: "การเคลื่อนที่และเรขาคณิต",
  dynamics: "แรง พลังงาน และโมเมนตัม",
  materials: "กลศาสตร์วัสดุ",
  fluids: "ของไหล",
  thermal: "ความร้อน",
};
export const byId = (id) => QUANTITIES.find((q) => q.id === id);
// ดัชนีสัญลักษณ์ -> ปริมาณ (ใช้สร้างตัวเลือกหลอกในควิซ)
export const symbolIndex = (() => {
  const m = {};
  for (const q of QUANTITIES)
    for (const s of q.symbols) (m[s] ||= []).push(q.id);
  return m;
})();
// สัญลักษณ์ที่ใช้ซ้ำกับปริมาณอื่น (จุดที่มักสับสน)
export const colliding = (q) =>
  [...new Set(q.symbols.flatMap((s) => (symbolIndex[s] || []).filter((id) => id !== q.id)))];
