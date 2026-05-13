import { DatabaseSync } from "node:sqlite";
import path from "path";
import fs from "fs";

const DB_DIR = path.join(__dirname, "..", "..", "data");
const DB_PATH = path.join(DB_DIR, "universities.db");

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const db = new DatabaseSync(DB_PATH);
db.exec("PRAGMA journal_mode = WAL");

const universities = [
  {
    id: "mit",
    name: "Massachusetts Institute of Technology",
    country: "USA",
    city: "Cambridge",
    globalRank: 1,
    logoUrl: null,
    website: "https://www.mit.edu",
    description:
      "MIT is a world-leading research university dedicated to advancing knowledge in science, technology, engineering, and mathematics. Founded in 1861, it has produced 97 Nobel laureates and is home to groundbreaking research labs.",
    specialties: ["Engineering", "Computer Science", "Physics", "Mathematics", "Economics"],
    requirements: { minGPA: 3.9, ieltsMin: 7.0, toeflMin: 100, satMin: 1570, greMin: 163, applicationDeadline: "January 1", tuitionFeeUSD: 57590, acceptanceRate: 4 },
    stats: { studentCount: 11574, internationalPercent: 34, researchOutput: "Very High", facultyStudentRatio: "1:3" },
  },
  {
    id: "stanford",
    name: "Stanford University",
    country: "USA",
    city: "Stanford",
    globalRank: 2,
    logoUrl: null,
    website: "https://www.stanford.edu",
    description:
      "Stanford University is a private research university in Silicon Valley known for its entrepreneurial culture and proximity to tech industry leaders. It has produced 83 Nobel laureates and numerous Fortune 500 company founders.",
    specialties: ["Computer Science", "Engineering", "Business", "Medicine", "Law"],
    requirements: { minGPA: 3.9, ieltsMin: 7.0, toeflMin: 100, satMin: 1550, greMin: 163, applicationDeadline: "January 2", tuitionFeeUSD: 61731, acceptanceRate: 4 },
    stats: { studentCount: 17249, internationalPercent: 24, researchOutput: "Very High", facultyStudentRatio: "1:5" },
  },
  {
    id: "harvard",
    name: "Harvard University",
    country: "USA",
    city: "Cambridge",
    globalRank: 3,
    logoUrl: null,
    website: "https://www.harvard.edu",
    description:
      "Harvard is the oldest university in the United States and one of the most prestigious in the world. It has produced 161 Nobel laureates, 8 U.S. presidents, and dozens of heads of state.",
    specialties: ["Medicine", "Law", "Business", "Economics", "Political Science"],
    requirements: { minGPA: 3.9, ieltsMin: 7.0, toeflMin: 100, satMin: 1580, greMin: 163, applicationDeadline: "January 1", tuitionFeeUSD: 59076, acceptanceRate: 3 },
    stats: { studentCount: 23731, internationalPercent: 25, researchOutput: "Very High", facultyStudentRatio: "1:7" },
  },
  {
    id: "oxford",
    name: "University of Oxford",
    country: "UK",
    city: "Oxford",
    globalRank: 4,
    logoUrl: null,
    website: "https://www.ox.ac.uk",
    description:
      "Oxford is the oldest university in the English-speaking world, with evidence of teaching dating back to 1096. It is consistently ranked among the top universities globally and has educated 28 British Prime Ministers.",
    specialties: ["Philosophy", "Medicine", "Law", "Economics", "Literature"],
    requirements: { minGPA: 3.7, ieltsMin: 7.5, toeflMin: 110, satMin: null, greMin: null, applicationDeadline: "October 15", tuitionFeeUSD: 45000, acceptanceRate: 17 },
    stats: { studentCount: 24515, internationalPercent: 46, researchOutput: "Very High", facultyStudentRatio: "1:11" },
  },
  {
    id: "cambridge",
    name: "University of Cambridge",
    country: "UK",
    city: "Cambridge",
    globalRank: 5,
    logoUrl: null,
    website: "https://www.cam.ac.uk",
    description:
      "The University of Cambridge is a collegiate research university with a rich history dating to 1209. Its alumni include Isaac Newton, Charles Darwin, and Stephen Hawking. It has produced 121 Nobel laureates.",
    specialties: ["Natural Sciences", "Mathematics", "Engineering", "Law", "Economics"],
    requirements: { minGPA: 3.7, ieltsMin: 7.5, toeflMin: 110, satMin: null, greMin: null, applicationDeadline: "October 15", tuitionFeeUSD: 42000, acceptanceRate: 21 },
    stats: { studentCount: 24450, internationalPercent: 39, researchOutput: "Very High", facultyStudentRatio: "1:11" },
  },
  {
    id: "eth-zurich",
    name: "ETH Zurich",
    country: "Switzerland",
    city: "Zurich",
    globalRank: 7,
    logoUrl: null,
    website: "https://ethz.ch",
    description:
      "ETH Zurich is Switzerland's federal institute of technology and one of the leading universities in science, technology, engineering and mathematics. Albert Einstein studied here. It has produced 22 Nobel laureates.",
    specialties: ["Engineering", "Computer Science", "Mathematics", "Physics", "Architecture"],
    requirements: { minGPA: 3.5, ieltsMin: 7.0, toeflMin: 95, satMin: null, greMin: null, applicationDeadline: "December 15", tuitionFeeUSD: 1500, acceptanceRate: 27 },
    stats: { studentCount: 22193, internationalPercent: 40, researchOutput: "Very High", facultyStudentRatio: "1:16" },
  },
  {
    id: "imperial",
    name: "Imperial College London",
    country: "UK",
    city: "London",
    globalRank: 8,
    logoUrl: null,
    website: "https://www.imperial.ac.uk",
    description:
      "Imperial College London is a science-focused research university known for engineering, medicine, and business. Located in South Kensington, it collaborates extensively with London's thriving tech and finance industries.",
    specialties: ["Engineering", "Medicine", "Natural Sciences", "Business"],
    requirements: { minGPA: 3.7, ieltsMin: 7.0, toeflMin: 100, satMin: null, greMin: null, applicationDeadline: "January 15", tuitionFeeUSD: 38000, acceptanceRate: 14 },
    stats: { studentCount: 19400, internationalPercent: 59, researchOutput: "Very High", facultyStudentRatio: "1:11" },
  },
  {
    id: "nus",
    name: "National University of Singapore",
    country: "Singapore",
    city: "Singapore",
    globalRank: 8,
    logoUrl: null,
    website: "https://www.nus.edu.sg",
    description:
      "NUS is Singapore's flagship university and a leading global university centred in Asia. It offers a global approach to education and research, with a focus on Asian perspectives and expertise.",
    specialties: ["Engineering", "Computing", "Business", "Medicine", "Law"],
    requirements: { minGPA: 3.6, ieltsMin: 6.5, toeflMin: 90, satMin: 1450, greMin: null, applicationDeadline: "February 28", tuitionFeeUSD: 17550, acceptanceRate: 5 },
    stats: { studentCount: 40315, internationalPercent: 37, researchOutput: "Very High", facultyStudentRatio: "1:18" },
  },
  {
    id: "ucl",
    name: "University College London",
    country: "UK",
    city: "London",
    globalRank: 9,
    logoUrl: null,
    website: "https://www.ucl.ac.uk",
    description:
      "UCL is a world-leading research university located in the heart of London. Founded in 1826, it was the first university in England to admit students regardless of religion or gender.",
    specialties: ["Medicine", "Law", "Architecture", "Economics", "Engineering"],
    requirements: { minGPA: 3.6, ieltsMin: 7.0, toeflMin: 96, satMin: null, greMin: null, applicationDeadline: "January 26", tuitionFeeUSD: 36000, acceptanceRate: 63 },
    stats: { studentCount: 42000, internationalPercent: 54, researchOutput: "Very High", facultyStudentRatio: "1:8" },
  },
  {
    id: "uchicago",
    name: "University of Chicago",
    country: "USA",
    city: "Chicago",
    globalRank: 10,
    logoUrl: null,
    website: "https://www.uchicago.edu",
    description:
      "The University of Chicago is renowned for its rigorous intellectual culture and groundbreaking research in economics, law, and social sciences. It has produced 100 Nobel laureates and is home to the famous Chicago School of Economics.",
    specialties: ["Economics", "Law", "Business", "Sociology", "Political Science"],
    requirements: { minGPA: 3.9, ieltsMin: 7.0, toeflMin: 104, satMin: 1560, greMin: 163, applicationDeadline: "January 2", tuitionFeeUSD: 63801, acceptanceRate: 6 },
    stats: { studentCount: 18452, internationalPercent: 35, researchOutput: "Very High", facultyStudentRatio: "1:6" },
  },
  {
    id: "caltech",
    name: "California Institute of Technology",
    country: "USA",
    city: "Pasadena",
    globalRank: 10,
    logoUrl: null,
    website: "https://www.caltech.edu",
    description:
      "Caltech is a world-renowned science and engineering research university with a small but highly selective student body. It manages the Jet Propulsion Laboratory for NASA and has produced 47 Nobel laureates.",
    specialties: ["Physics", "Engineering", "Computer Science", "Mathematics", "Chemistry"],
    requirements: { minGPA: 4.0, ieltsMin: 7.0, toeflMin: 100, satMin: 1570, greMin: 163, applicationDeadline: "January 3", tuitionFeeUSD: 60816, acceptanceRate: 3 },
    stats: { studentCount: 2240, internationalPercent: 27, researchOutput: "Very High", facultyStudentRatio: "1:3" },
  },
  {
    id: "princeton",
    name: "Princeton University",
    country: "USA",
    city: "Princeton",
    globalRank: 12,
    logoUrl: null,
    website: "https://www.princeton.edu",
    description:
      "Princeton University is one of the oldest and most prestigious universities in the United States. Known for its beautiful campus, undergraduate focus, and exceptional graduate programs in mathematics and sciences.",
    specialties: ["Mathematics", "Physics", "Economics", "Computer Science", "Engineering"],
    requirements: { minGPA: 3.9, ieltsMin: 7.0, toeflMin: 100, satMin: 1570, greMin: 163, applicationDeadline: "January 1", tuitionFeeUSD: 59710, acceptanceRate: 4 },
    stats: { studentCount: 9203, internationalPercent: 24, researchOutput: "Very High", facultyStudentRatio: "1:5" },
  },
  {
    id: "yale",
    name: "Yale University",
    country: "USA",
    city: "New Haven",
    globalRank: 14,
    logoUrl: null,
    website: "https://www.yale.edu",
    description:
      "Yale University is an Ivy League research university known for its law school, medical school, and arts programs. Yale's residential college system fosters a close-knit community among its students and faculty.",
    specialties: ["Law", "Medicine", "Drama", "Music", "Political Science"],
    requirements: { minGPA: 3.9, ieltsMin: 7.0, toeflMin: 100, satMin: 1560, greMin: 163, applicationDeadline: "January 2", tuitionFeeUSD: 64700, acceptanceRate: 5 },
    stats: { studentCount: 14981, internationalPercent: 22, researchOutput: "Very High", facultyStudentRatio: "1:6" },
  },
  {
    id: "columbia",
    name: "Columbia University",
    country: "USA",
    city: "New York",
    globalRank: 12,
    logoUrl: null,
    website: "https://www.columbia.edu",
    description:
      "Columbia University is an Ivy League research university situated in New York City. It is home to world-class programs in journalism, business, law, medicine, and engineering, with strong ties to international organizations at the UN.",
    specialties: ["Journalism", "Business", "Law", "Engineering", "Medicine"],
    requirements: { minGPA: 3.9, ieltsMin: 7.0, toeflMin: 100, satMin: 1550, greMin: 163, applicationDeadline: "January 1", tuitionFeeUSD: 65524, acceptanceRate: 4 },
    stats: { studentCount: 32429, internationalPercent: 33, researchOutput: "Very High", facultyStudentRatio: "1:6" },
  },
  {
    id: "toronto",
    name: "University of Toronto",
    country: "Canada",
    city: "Toronto",
    globalRank: 21,
    logoUrl: null,
    website: "https://www.utoronto.ca",
    description:
      "The University of Toronto is Canada's leading university and a major research institution globally. It is known for its size, diversity, and excellence across virtually every academic discipline.",
    specialties: ["Medicine", "Engineering", "Computer Science", "Business", "Law"],
    requirements: { minGPA: 3.6, ieltsMin: 6.5, toeflMin: 100, satMin: null, greMin: null, applicationDeadline: "March 1", tuitionFeeUSD: 45690, acceptanceRate: 43 },
    stats: { studentCount: 97000, internationalPercent: 28, researchOutput: "Very High", facultyStudentRatio: "1:19" },
  },
  {
    id: "tum",
    name: "Technical University of Munich",
    country: "Germany",
    city: "Munich",
    globalRank: 37,
    logoUrl: null,
    website: "https://www.tum.de",
    description:
      "TUM is Germany's top technical university and a European leader in engineering and natural sciences. Known for its strong industry partnerships, particularly with BMW, Siemens, and Munich's thriving startup ecosystem.",
    specialties: ["Engineering", "Computer Science", "Natural Sciences", "Medicine", "Mathematics"],
    requirements: { minGPA: 3.5, ieltsMin: 6.5, toeflMin: 88, satMin: null, greMin: null, applicationDeadline: "May 31", tuitionFeeUSD: 500, acceptanceRate: 9 },
    stats: { studentCount: 50000, internationalPercent: 37, researchOutput: "Very High", facultyStudentRatio: "1:28" },
  },
  {
    id: "epfl",
    name: "EPFL",
    country: "Switzerland",
    city: "Lausanne",
    globalRank: 36,
    logoUrl: null,
    website: "https://www.epfl.ch",
    description:
      "EPFL is one of Europe's most vibrant and cosmopolitan science and technology institutions. Located on the shores of Lake Geneva, it is known for innovation, entrepreneurship, and interdisciplinary research.",
    specialties: ["Engineering", "Computer Science", "Mathematics", "Physics", "Architecture"],
    requirements: { minGPA: 3.5, ieltsMin: 7.0, toeflMin: 95, satMin: null, greMin: null, applicationDeadline: "January 15", tuitionFeeUSD: 1300, acceptanceRate: 17 },
    stats: { studentCount: 11900, internationalPercent: 60, researchOutput: "Very High", facultyStudentRatio: "1:11" },
  },
  {
    id: "melbourne",
    name: "University of Melbourne",
    country: "Australia",
    city: "Melbourne",
    globalRank: 33,
    logoUrl: null,
    website: "https://www.unimelb.edu.au",
    description:
      "The University of Melbourne is Australia's leading university and a top-ranked global institution. Established in 1853, it offers a broad range of disciplines and is particularly strong in medicine, law, and education.",
    specialties: ["Medicine", "Law", "Education", "Engineering", "Arts"],
    requirements: { minGPA: 3.5, ieltsMin: 6.5, toeflMin: 79, satMin: null, greMin: null, applicationDeadline: "October 31", tuitionFeeUSD: 44000, acceptanceRate: 70 },
    stats: { studentCount: 52000, internationalPercent: 42, researchOutput: "Very High", facultyStudentRatio: "1:26" },
  },
  {
    id: "cornell",
    name: "Cornell University",
    country: "USA",
    city: "Ithaca",
    globalRank: 12,
    logoUrl: null,
    website: "https://www.cornell.edu",
    description:
      "Cornell University is an Ivy League research university that combines a broad liberal arts education with highly respected professional schools in engineering, business, architecture, agriculture, and law.",
    specialties: ["Engineering", "Business", "Architecture", "Agriculture", "Law"],
    requirements: { minGPA: 3.8, ieltsMin: 7.0, toeflMin: 100, satMin: 1530, greMin: 160, applicationDeadline: "January 2", tuitionFeeUSD: 63200, acceptanceRate: 11 },
    stats: { studentCount: 25000, internationalPercent: 27, researchOutput: "Very High", facultyStudentRatio: "1:9" },
  },
  {
    id: "jhu",
    name: "Johns Hopkins University",
    country: "USA",
    city: "Baltimore",
    globalRank: 26,
    logoUrl: null,
    website: "https://www.jhu.edu",
    description:
      "Johns Hopkins University is renowned for its medical school and public health programs. It was America's first research university and continues to lead in biomedical research, international studies, and engineering.",
    specialties: ["Medicine", "Public Health", "Engineering", "International Studies", "Nursing"],
    requirements: { minGPA: 3.9, ieltsMin: 7.0, toeflMin: 100, satMin: 1540, greMin: 163, applicationDeadline: "January 2", tuitionFeeUSD: 60480, acceptanceRate: 7 },
    stats: { studentCount: 24000, internationalPercent: 30, researchOutput: "Very High", facultyStudentRatio: "1:8" },
  },
  {
    id: "peking",
    name: "Peking University",
    country: "China",
    city: "Beijing",
    globalRank: 14,
    logoUrl: null,
    website: "https://www.pku.edu.cn",
    description:
      "Peking University is China's most prestigious comprehensive university, founded in 1898. It is a leading center for education and research in humanities, social sciences, and natural sciences in Asia.",
    specialties: ["Chinese Language", "Economics", "Law", "Engineering", "Medicine"],
    requirements: { minGPA: 3.5, ieltsMin: 6.0, toeflMin: 90, satMin: null, greMin: null, applicationDeadline: "March 31", tuitionFeeUSD: 4800, acceptanceRate: 15 },
    stats: { studentCount: 46000, internationalPercent: 14, researchOutput: "Very High", facultyStudentRatio: "1:8" },
  },
  {
    id: "snu",
    name: "Seoul National University",
    country: "South Korea",
    city: "Seoul",
    globalRank: 41,
    logoUrl: null,
    website: "https://www.snu.ac.kr",
    description:
      "Seoul National University is South Korea's most prestigious university and consistently ranked among Asia's top institutions. It is known for excellence in engineering, natural sciences, and professional programs.",
    specialties: ["Engineering", "Natural Sciences", "Business", "Law", "Medicine"],
    requirements: { minGPA: 3.5, ieltsMin: 6.5, toeflMin: 88, satMin: null, greMin: null, applicationDeadline: "February 28", tuitionFeeUSD: 6000, acceptanceRate: 10 },
    stats: { studentCount: 28000, internationalPercent: 8, researchOutput: "Very High", facultyStudentRatio: "1:24" },
  },
];

db.exec("DROP TABLE IF EXISTS universities");
db.exec(`
  CREATE TABLE universities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    global_rank INTEGER NOT NULL,
    logo_url TEXT,
    website TEXT NOT NULL,
    description TEXT NOT NULL,
    specialties TEXT NOT NULL,
    requirements TEXT NOT NULL,
    stats TEXT NOT NULL
  )
`);

const insert = db.prepare(`
  INSERT INTO universities (id, name, country, city, global_rank, logo_url, website, description, specialties, requirements, stats)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

db.exec("BEGIN");
for (const u of universities) {
  insert.run(
    u.id,
    u.name,
    u.country,
    u.city,
    u.globalRank,
    u.logoUrl,
    u.website,
    u.description,
    JSON.stringify(u.specialties),
    JSON.stringify(u.requirements),
    JSON.stringify(u.stats)
  );
}
db.exec("COMMIT");

console.log(`Seeded ${universities.length} universities successfully.`);
db.close();
