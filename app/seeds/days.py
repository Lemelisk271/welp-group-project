from app.models import db, Day, environment, SCHEMA
from sqlalchemy.sql import text
import datetime



def generate_days(businesses):
  hours = []
  for business in businesses:
    mon = Day(
      day = "Mon",
      closed = True,
      business_hours_days = [business],
      dayIdx = 1
    )
    hours.append(mon)
    tue = Day(
      day = "Tue",
      closed = True,
      business_hours_days = [business],
      dayIdx = 2
    )
    hours.append(tue)
    wed = Day(
      day = "Wed",
      open_time = datetime.time(9,00,00),
      close_time = datetime.time(21,00,00),
      business_hours_days = [business],
      dayIdx = 3
    )
    hours.append(wed)
    thu = Day(
      day = "Thu",
      open_time = datetime.time(9,00,00),
      close_time = datetime.time(21,00,00),
      business_hours_days = [business],
      dayIdx = 4
    )
    hours.append(thu)
    fri = Day(
      day = "Fri",
      open_time = datetime.time(9,00,00),
      close_time = datetime.time(21,00,00),
      business_hours_days = [business],
      dayIdx = 5
    )
    hours.append(fri)
    sat = Day(
      day = "Sat",
      open_time = datetime.time(9,00,00),
      close_time = datetime.time(21,00,00),
      business_hours_days = [business],
      dayIdx = 6
    )
    hours.append(sat)
    sun = Day(
      day = "Sun",
      open_time = datetime.time(9,00,00),
      close_time = datetime.time(21,00,00),
      business_hours_days = [business],
      dayIdx = 7
    )
    hours.append(sun)
  return hours

def seed_days(businesses):
  days = generate_days(businesses)
  add_days = [db.session.add(day) for day in days]
  db.session.commit()
  return days

def undo_days():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.business_hours RESTART IDENTITY CASCADE")
    db.session.execute(f"TRUNCATE table {SCHEMA}.days RESTART IDENTITY CASCADE")
  else:
    db.session.execute(text("DELETE FROM business_hours"))
    db.session.execute(text("DELETE FROM days"))

  db.session.commit()
