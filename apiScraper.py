#!/bin/python
import requests

with open("items.txt", "r") as ins:
    for line in ins:
        i = line
        # print "http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=" + str(i.rstrip("\n\r"))
        # print "A break in items"
        try:
            response = requests.get("http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=" + str(i.rstrip("\n\r")))
        except:
            break

        if response.content:
            print(response.content + ',')
