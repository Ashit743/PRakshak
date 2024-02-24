import pymysql
import os
timeout = 10
connection = pymysql.connect(
  charset="utf8mb4",
  connect_timeout=timeout,
  cursorclass=pymysql.cursors.DictCursor,
  db="myDatabase",
  host= os.environ["AIVEN_DB_HOST"],
  password= os.environ["AIVEN_DB_PASS"],
  read_timeout=timeout,
  port=int(os.environ["AIVEN_DB_PORT"]),
  user="avnadmin",
  write_timeout=timeout,
)
