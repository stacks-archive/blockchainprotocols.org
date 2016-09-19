import json
import datetime

block_records = []
day_records = []

with open('data/block-registrations-sep18.txt') as f:
    registrations_data = f.read()
    block_records = json.loads(registrations_data)

current_date = datetime.date(2015, 9, 8)

i = 0
registrations_for_current_day = 0
block_numbers_for_current_day = []

blocks_per_day = 151.5

for block_record in block_records:
    i += 1

    registrations_for_current_day += block_record["registrations"]
    block_numbers_for_current_day.append(block_record["block"])

    if (int(i % blocks_per_day) == 0) or (i == len(block_records) - 1):
        current_date += datetime.timedelta(days=1)
        day_record = {
            "date": current_date.strftime("%d-%b-%y"),
            "registrations": registrations_for_current_day
        }
        day_records.append(day_record)
        registrations_for_current_day = 0
        block_numbers_for_current_day = []

total_registrations = 0

for day_record in day_records:
    total_registrations += day_record["registrations"]

print total_registrations

print day_records