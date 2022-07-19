f = open("./python/text.txt",'r')
while True:
    line = f.read()
print(line)
f.close()