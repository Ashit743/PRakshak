import pymysql

timeout = 10
connection = pymysql.connect(
  charset="utf8mb4",
  connect_timeout=timeout,
  cursorclass=pymysql.cursors.DictCursor,
  db="myDatabase",
  host="mysql-573b75b-prakshak-1234.a.aivencloud.com",
  password="AVNS_xow4bsXavI6bmPG-GaS",
  read_timeout=timeout,
  port=21392,
  user="avnadmin",
  write_timeout=timeout,
)
