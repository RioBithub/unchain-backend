import { config } from "dotenv";
config()

export const CONFIG = {
  PORT: process.env.PORT,
  MODEL_SUGAR_LEVEL_URL: process.env.MODEL_SUGAR_LEVEL_URL,
  MODEL_USER_BEHAVIOUR_URL: process.env.MODEL_USER_BEHAVIOUR_URL
}

export const MILLISECONDS = (1000 * 60 * 60 * 24)

export const SUGAR_LEVEL = ['High', 'Low', 'Normal'];

export const BEHAVIOUR_USER = ['Consistent Balance', 'Erratic Behavior Attention', 'High Risk Intake Attention', 'Incomplete Data User', 'Irregular Reporting Anomaly', 'Moderate Addiction', 'Severe Addiction', 'Suspected Underreporting'];

export const MESSAGE_OPTION = {
  'Incomplete Data User': [
    "Kayaknya data konsumsi gula kamu kurang nih, coba deh catat konsumsi gula kamu minimal 50% supaya kita bisa kasih rekomendasi yang lebih akurat. Kalau kamu merasa ketagihan gula, yuk, coba mulai track biar bisa atur pola makan lebih baik!",
    "Data yang kamu input kayaknya belum lengkap. Biar bisa bantu kamu perbaiki pola makan, pastiin kamu catat konsumsi gula secara rutin, ya! Dengan data yang lebih lengkap, kita bisa kasih solusi yang cocok untuk kamu.",
    "Ada beberapa hari yang datanya hilang nih. Jangan sampai ketagihan gula bikin kamu lupa track. Pastikan untuk catat konsumsi gula kamu secara konsisten supaya kita bisa kasih feedback yang lebih pas buat kamu.",
    "Ingat, konsistensi penting banget! Ketagihan gula bisa bikin pola makan kamu nggak terkontrol, jadi pastikan data konsumsi gula kamu lengkap supaya kita bisa bantu atasi masalah ini.",
    "Biar kita bisa bantu kamu lebih maksimal, pastikan konsumsi gula tercatat dengan lengkap. Dengan begitu, kita bisa tahu kalau ada ketagihan gula yang harus kamu perhatikan dan bantu cari solusi yang tepat."
  ],
  'Irregular Reporting Anomaly': [
    "Kita lihat ada lebih dari 20% hari yang belum tercatat, jadi agak susah buat ngasih rekomendasi yang bermanfaat. Kalau kebiasaan makan kamu sering ketagihan gula, coba lebih rajin catat konsumsi gula kamu, ya!",
    "Data konsumsi gula kamu keliatan ada banyak celah. Kalau kamu lagi ketagihan gula, coba kontrol dan laporin secara rutin supaya kita bisa kasih insight lebih baik buat kamu.",
    "Kayaknya kamu sering kelewatan catat konsumsi gula. Kalau kamu merasa ketagihan gula, coba deh input datanya lebih konsisten supaya kita bisa kasih saran yang pas buat bantu atasi ketergantungan kamu.",
    "Kebiasaan ketagihan gula bisa bikin pelaporan jadi nggak teratur. Coba lebih rajin catat konsumsi gula kamu supaya kita bisa bantu mengatur asupan gula kamu dengan lebih baik.",
    "Coba buat kebiasaan track konsumsi gula yang lebih teratur. Dengan catatan yang lebih konsisten, kita bisa bantu kamu mengatasi ketagihan gula yang bisa mempengaruhi pola makan."
  ],
  'Suspected Underreporting': [
    "Konsumsi gula kamu kok selalu di bawah 10 gram ya? Bisa jadi ini gara-gara kamu yang gak rajin lapor ke kita, lho. Kalau emang bener gitu, kasih konfirmasi, ya! Kalau nggak, pastiin catat semua konsumsi gula kamu biar bisa kasih feedback yang akurat dan bantu atasi ketagihan gula.",
    "Kamu kelihatan sering lapor konsumsi gula di bawah 10 gram. Cek lagi deh datanya atau kasih tau kami kalau ada alasan medis buat asupan gula yang rendah ini, atau mungkin ketagihan gula kamu masih bisa terkontrol.",
    "Kayaknya konsumsi gula kamu konsisten rendah. Kalau kamu yakin gitu, kasih konfirmasi, atau pastiin semua data kamu udah bener supaya bisa dapet rekomendasi yang tepat, apalagi buat kamu yang mau bebas dari ketagihan gula.",
    "Jika kamu merasa konsumsi gula kamu memang rendah, coba pastikan datanya akurat. Ketagihan gula bisa menyebabkan underreporting yang mengganggu, jadi pastikan semuanya tercatat dengan jelas.",
    "Sering mencatat konsumsi gula yang rendah bisa jadi tanda kamu menghindari atau kurang memperhatikan asupan gula yang sebenarnya. Kita perlu data yang akurat untuk bantu atasi ketagihan gula yang mungkin terjadi."
  ],
  'Severe Addiction': [
    "Asupan gula kamu konsisten di atas 70 gram per hari, itu udah kelebihan banget! Bisa bahaya buat kesehatan dan bikin ketagihan gula makin parah. Mending kurangi asupan gula kamu dan konsultasi ke profesional, ya.",
    "Kamu rutin konsumsi lebih dari 70 gram gula per hari, itu bisa menyebabkan masalah kesehatan jangka panjang kayak diabetes, plus bikin ketagihan gula makin susah dihindari. Kurangi deh asupan gula dan coba konsultasi sama dokter.",
    "Konsumsi gula di atas 70 gram sehari udah kelebihan parah! Itu bisa pengaruh ke kesehatan kamu dan membuat ketagihan gula lebih sulit dihentikan. Sebaiknya kurangi konsumsi gula dan bicarakan sama profesional kesehatan.",
    "Kelebihan konsumsi gula yang terus-terusan bisa jadi tanda ketagihan gula. Kamu perlu banget kontrol asupan gula buat jaga kesehatan dan hindari masalah yang lebih serius.",
    "Sering konsumsi lebih dari 70 gram gula bisa memperparah ketagihan gula. Sebaiknya mulai kurangi konsumsi gula dan konsultasi ke ahli gizi untuk bantu atasi pola makan yang tidak sehat."
  ],
  'Moderate Addiction': [
    "Konsumsi gula kamu antara 50 hingga 70 gram per hari, itu udah tergolong kelebihan gula. Walaupun nggak seberat yang parah, mending kurangi supaya tetap dalam batas yang sehat dan nggak makin ketagihan gula.",
    "Kamu konsumsi antara 50-70 gram gula per hari, itu udah termasuk kelebihan gula. Tetap hati-hati, jangan sampe ketagihan gula terus, ya!",
    "Kelebihan gula dalam rentang 50 sampai dengan 70 gram bisa tetep berisiko untuk kesehatan. Mending coba kurangi konsumsi gula dan ganti makanan manis dengan yang lebih sehat supaya bisa terhindar dari ketagihan gula.",
    "Walaupun nggak setinggi yang parah, konsumsi gula yang berlebihan ini bisa mengarah pada ketagihan gula. Kurangi sedikit demi sedikit buat pola makan yang lebih sehat dan bebas dari ketergantungan.",
    "Terlalu sering konsumsi gula lebih dari 50 gram bisa bikin ketagihan gula makin sulit dikendalikan. Yuk, mulai kurangi sedikit demi sedikit supaya bisa atasi kebiasaan ini."
  ],
  'No Input Anomaly': [
    "Kok udah lama banget nggak input konsumsi gula ya? Coba deh track lagi secara rutin supaya kita bisa kasih insight yang lebih oke buat kebiasaan kamu, biar ketagihan gula kamu bisa dikendalikan.",
    "Sepertinya ada beberapa hari yang nggak ada data konsumsi gula. Coba untuk selalu input data konsumsi gula supaya kamu dapet rekomendasi yang tepat dan bisa track kemajuan kamu dalam mengatasi ketagihan gula.",
    "Udah beberapa hari nih nggak ada data konsumsi gula. Penting banget buat input konsumsi gula kamu setiap hari supaya kita bisa track kebiasaan kamu dan kasih feedback yang berguna untuk mengurangi ketagihan gula.",
    "Lama nggak input konsumsi gula bisa bikin pola makan kamu nggak terkontrol, apalagi kalau ketagihan gula. Yuk, mulai rajin input data konsumsi gula supaya kita bisa bantu lebih cepat.",
    "Jangan biarkan ketagihan gula menguasai kamu. Mulai input data konsumsi gula lagi secara rutin supaya kita bisa bantu kamu mengelola pola makan lebih baik."
  ],
  'Persistent Overconsumption Attention': [
    "Konsumsi gula kamu udah terus-terusan lebih dari 70 gram per hari selama lebih dari 7 hari, itu bahaya banget buat kesehatan dan bisa bikin ketagihan gula semakin parah. Coba kurangi deh asupan gula kamu.",
    "Selama lebih dari 7 hari, konsumsi gula kamu selalu tinggi (di atas 70 gram per hari). Ini bisa jadi masalah kesehatan dan memperparah ketagihan gula kamu. Mending mulai kurangi konsumsi gula kamu, ya.",
    "Konsumsi gula kamu tinggi banget (di atas 70 gram per hari) selama beberapa hari. Kita sarankan banget buat kurangi konsumsi gula dan konsultasi sama profesional kesehatan supaya ketagihan gula bisa diatasi.",
    "Jika konsumsi gula tinggi ini terus-terusan, bisa memperparah ketagihan gula yang kamu alami. Mending mulai kurangi sedikit demi sedikit supaya nggak lebih buruk lagi.",
    "Ketagihan gula yang berlanjut bisa punya dampak besar. Coba kurangi konsumsi gula kamu secara bertahap dan pertimbangkan untuk cari bantuan medis."
  ],
  'Erratic Behavior Attention': [
    "Konsumsi gula kamu keliatan nggak stabil, ada fluktuasi tinggi, celah data, dan kadang-kadang kelebihan. Ini bisa tanda pola makan yang nggak stabil, mungkin juga karena ketagihan gula. Coba buat track yang lebih konsisten dan jaga pola makan yang lebih stabil.",
    "Kami lihat ada fluktuasi dan celah di konsumsi gula kamu. Ini bisa berdampak ke kesehatan, lho, dan memperburuk ketagihan gula. Coba buat jadwal yang lebih konsisten dan kurangi variasi asupan gula kamu.",
    "Pola konsumsi gula kamu keliatan nggak konsisten banget. Mungkin perlu bikin diet yang lebih stabil dan rutin supaya hasil kesehatan yang lebih baik, dan supaya ketagihan gula bisa hilang.",
    "Pola konsumsi gula yang nggak stabil ini bisa jadi akibat ketagihan gula. Mulai coba atur jadwal makan yang lebih teratur dan hindari fluktuasi yang nggak sehat.",
    "Ketagihan gula sering menyebabkan pola makan yang nggak stabil. Coba konsisten dengan asupan gula kamu dan hindari lonjakan tinggi supaya bisa bantu atasi kebiasaan ini."
  ],
  'High Risk Intake Attention': [
    "Di beberapa hari, konsumsi gula kamu udah mencapai level bahaya. Itu bisa jadi masalah kesehatan serius dan meningkatkan ketagihan gula. Coba deh kurangi hari-hari dengan asupan gula tinggi dan konsultasi sama dokter.",
    "Konsumsi gula kamu udah tinggi banget di beberapa hari, bisa berisiko buat kesehatan dan jadi makin susah lepas dari ketagihan gula. Coba kurangi asupan gula tinggi ini dan pertimbangkan untuk cari nasihat medis.",
    "Kamu punya hari-hari dengan konsumsi gula yang sangat tinggi, ini bisa jadi risiko kesehatan dan memperburuk ketagihan gula. Penting banget buat monitor asupan kamu dan hindari hari-hari berisiko tinggi itu ke depan.",
    "Hari-hari dengan asupan gula tinggi bisa memperburuk ketagihan gula. Coba mulai perhatikan hari-hari itu dan kurangi konsumsi gula secara signifikan.",
    "Hindari konsumsi gula yang sangat tinggi. Ini bisa memicu ketagihan gula dan masalah kesehatan lainnya. Cobalah untuk menurunkan asupan gula dan kontrol pola makan kamu."
  ],
  'Consistent Balance': [
    "Mantap! Konsumsi gula kamu seimbang, dengan sedikit kebablasan yang nggak masalah. Terus jaga pola makan sehat ini dan terus track asupan kamu buat hasil terbaik, biar ketagihan gula nggak kambuh.",
    "Konsumsi gula kamu ada di angka yang sehat, meski kadang sedikit kelebihan. Terus pertahankan pola makan sehat kamu dan jaga konsistensinya supaya ketagihan gula nggak muncul lagi.",
    "Kerja bagus! Asupan gula kamu masih di angka ideal, cuma sedikit kebablasan sesekali. Tetap jaga keseimbangan ini buat gaya hidup sehat dan hindari ketagihan gula.",
    "Kamu udah sukses menjaga konsumsi gula dalam batas sehat! Terus pertahankan pola makan ini supaya ketagihan gula tetap terkontrol.",
    "Konsistensi ini penting untuk menjaga pola makan yang sehat. Terus seimbang, dan pastikan ketagihan gula kamu tetap terkendali."
  ],
  'Special Attention Needed': [
    "Berdasarkan pola konsumsi gula kamu, kami sarankan perhatian khusus. Penting banget buat jaga kadar gula kamu supaya gak makin ketagihan.",
    "Pola konsumsi kamu butuh perhatian khusus. Kami sarankan untuk lebih waspada dalam mengelola asupan gula supaya nggak ketagihan.",
    "Pola konsumsi gula kamu menunjukkan perlu perhatian lebih. Jaga pola konsumsi gula kamu dengan hati-hati, baik itu karena kelebihan, fluktuasi, atau asupan yang berisiko, supaya ketagihan gula bisa teratasi.",
    "Perhatian ekstra diperlukan buat kamu yang struggle dengan ketagihan gula. Pastikan konsumsi gula tetap terkontrol untuk menjaga kesehatan dan menghindari risiko kesehatan jangka panjang.",
    "Kami lihat ada pola konsumsi gula yang perlu perhatian ekstra. Pastikan untuk lebih fokus supaya ketagihan gula nggak jadi masalah buat kamu."
  ]
}