# Импорт библиотеки
import sqlite3
import numpy as np
import matplotlib.pyplot as plt

# import psycopg

"""connection = psycopg.connect(database="dbname", user="username", password="pass", host="hostname", port=5432)

cursor = connection.cursor()

cursor.execute("SELECT * FROM  Answers") - нужно чтобы подключиться к БД Макса"""

# Подключение к БД
con = sqlite3.connect("All_res_data.db")

# Создание курсора
cur = con.cursor()

# Выполнение запроса и получение всех результатов
result = cur.execute("""SELECT * FROM  Answers""").fetchall()
print(result)
con.close()

'''result = []
input_all = input().split(' ') #формат ввода: 1,2;d,v;1,2 12  (12 - это id, 1,2 - данные в первом столбце d.v - во втором)
in_id = int(input_all[1])
input_data = input_all[0].split(';')
input_data = [input_data[i].split(',') for i in range(3)]
for i in range(len(input_data[0])):
    result.append((input_data[0][i], input_data[1][i], input_data[2][i]))'''

in_id = int(input())

data_s = {}
k = 0
# Вывод результатов на экранx
for elem in result:
    if elem[0] not in data_s.keys():
        data_s[elem[0]] = [(elem[1], elem[2])]

    else:
        data_s[elem[0]] += [(elem[1], elem[2])]

data_all = [((data_s[in_id])[k][0].split('.'), data_s[in_id][k][1]) for k in range(len(data_s[in_id]))]
data_ar = ['-'.join(reversed(data_all[k][0])) for k in range(len(data_all))]
month = {}
for x in range(len(data_ar)):
    month[data_all[x][1]] = data_all[x][0][1]

res_data_all = sorted([((int(x[0][0]) + int(x[0][1]) * 30 + int(x[0][2]) * 365), x[1]) for x in data_all])

x = np.array([k[0] - res_data_all[0][0] for k in res_data_all], dtype=float)
y = np.array([k[1] for k in res_data_all], dtype=float)

print('Лучший результат за всё время: ', max(month.keys()))
max_key = -1000000

print('Лучшийе результаты по месяцам:')
for m in set((month.values())):
    for key_s in month.keys():
        if key_s > max_key and month[key_s] == m:
            max_key = key_s
    print(m, ' : ', max_key)
    max_key = -1000000

min_key = 10000000
print(' Худшие результаты по месяцам:')
for m in set((month.values())):
    for key_s in month.keys():
        if key_s < min_key and month[key_s] == m:
            min_key = key_s
    print(m, ' : ', min_key)
    max_key = 1000000


def lagranz(x, y, t):
    z = 0
    for j in range(len(y)):
        p1 = 1
        p2 = 1
        for i in range(len(x)):
            if i == j:
                p1 = p1 * 1
                p2 = p2 * 1
            else:
                p1 = p1 * (t - x[i])
                p2 = p2 * (x[j] - x[i])
        z = z + y[j] * p1 / p2
    return z


# xnew = np.linspace(np.min(x), np.max(x), 100)
# ynew = [lagranz(x, y, i) for i in xnew]
data_ar = sorted(data_ar)

fig, ax = plt.subplots()
dates = [np.datetime64(data_ar[x]) for x in range(len(data_ar))]

plt.xlabel("data")
plt.ylabel("results")


'''fig, axes = plt.subplots(2, 1)

axes[0].bar(dates, y)
axes[0].set_facecolor('seashell')
axes[1].set_facecolor('seashell')
fig.set_facecolor('floralwhite')
fig.set_figwidth(12) # ширина Figure
fig.set_figheight(6) # высота Figure


'''
plt.plot(dates, y)


plt.grid(True)
fig.savefig('graph.svg')
plt.show()
