const { hash, num, merkle, fixStack } = require('starknet');
const fs = require('node:fs');

function hash_posei (data) {
  return hash.computePoseidonHashOnElements(data);
}

const wood = [[1, 1, 40, 100, 50, 60, 2, 260, 7],
[1, 2, 65, 165, 85, 100, 1, 620, 13],
[1, 3, 110, 280, 140, 165, 1, 1190, 21],
[1, 4, 185, 465, 235, 280, 1, 2100, 31],
[1, 5, 310, 780, 390, 465, 1, 3560, 46],
[1, 6, 520, 1300, 650, 780, 2, 5890, 70],
[1, 7, 870, 2170, 1085, 1300, 2, 9620, 98],
[1, 8, 1450, 3625, 1810, 2175, 2, 15590, 140],
[1, 9, 2420, 6050, 3025, 3630, 2, 25150, 203],
[1, 10, 4040, 10105, 5050, 6060, 2, 40440, 280],
[1, 11, 6750, 16870, 8435, 10125, 2, 64900, 392],
[1, 12, 11270, 28175, 14090, 16905, 2, 17650, 525],
[1, 13, 18820, 47055, 23525, 28230, 2, 80280, 693],
[1, 14, 31430, 78580, 39290, 47150, 2, 7680, 889],
[1, 15, 52490, 131230, 65615, 78740, 2, 81610, 1120],
[1, 16, 87660, 219155, 109575, 131490, 3, 78930, 1400],
[1, 17, 146395, 365985, 182995, 219590, 3, 57370, 1820],
[1, 18, 244480, 611195, 305600, 366715, 3, 22880, 2240],
[1, 19, 408280, 1020695, 510350, 612420, 3, 36800, 2800],
[1, 20, 681825, 1704565, 852280, 1022740, 3, 76370, 3430],
];
const brick = [[2, 1, 80, 40, 80, 50, 2, 220, 7],
[2, 2, 135, 65, 135, 85, 1, 550, 13],
[2, 3, 225, 110, 225, 140, 1, 1080, 21],
[2, 4, 375, 185, 375, 235, 1, 1930, 31],
[2, 5, 620, 310, 620, 390, 1, 3290, 46],
[2, 6, 1040, 520, 1040, 650, 2, 5470, 70],
[2, 7, 1735, 870, 1735, 1085, 2, 8950, 98],
[2, 8, 2900, 1450, 2900, 1810, 2, 14520, 140],
[2, 9, 4840, 2420, 4840, 3025, 2, 23430, 203],
[2, 10, 8080, 4040, 8080, 5050, 2, 37690, 280],
[2, 11, 13500, 6750, 13500, 8435, 2, 60510, 392],
[2, 12, 22540, 11270, 22540, 14090, 2, 10610, 525],
[2, 13, 37645, 18820, 37645, 23525, 2, 69020, 693],
[2, 14, 62865, 31430, 62865, 39290, 2, 76070, 889],
[2, 15, 104985, 52490, 104985, 65615, 2, 52790, 1120],
[2, 16, 175320, 87660, 175320, 109575, 3, 32820, 1400],
[2, 17, 292790, 146395, 292790, 182995, 3, 69990, 1820],
[2, 18, 488955, 244480, 488955, 305600, 3, 77620, 2240],
[2, 19, 816555, 408280, 816555, 510350, 3, 20710, 2800],
[2, 20, 1363650, 681825, 1363650, 852280, 3, 33340, 3430],
];
const steel = [[3, 1, 100, 80, 30, 60, 3, 450, 7],
[3, 2, 165, 135, 50, 100, 2, 920, 13],
[3, 3, 280, 225, 85, 165, 2, 1670, 21],
[3, 4, 465, 375, 140, 280, 2, 2880, 31],
[3, 5, 780, 620, 235, 465, 2, 4800, 46],
[3, 6, 1300, 1040, 390, 780, 2, 7880, 70],
[3, 7, 2170, 1735, 650, 1300, 2, 12810, 98],
[3, 8, 3625, 2900, 1085, 2175, 2, 20690, 140],
[3, 9, 6050, 4840, 1815, 3630, 2, 33310, 203],
[3, 10, 10105, 8080, 3030, 6060, 2, 53500, 280],
[3, 11, 16870, 13500, 5060, 10125, 3, 85800, 392],
[3, 12, 28175, 22540, 8455, 16905, 3, 51070, 525],
[3, 13, 47055, 37645, 14115, 28230, 3, 47360, 693],
[3, 14, 78580, 62865, 23575, 47150, 3, 6850, 889],
[3, 15, 131230, 104985, 39370, 78740, 3, 45720, 1120],
[3, 16, 219155, 175320, 65745, 131490, 3, 38790, 1400],
[3, 17, 365985, 292790, 109795, 219590, 3, 62260, 1820],
[3, 18, 611195, 488955, 183360, 366715, 3, 65260, 2240],
[3, 19, 1020695, 816555, 306210, 612420, 3, 70050, 2800],
[3, 20, 1704565, 1363650, 511370, 1022740, 3, 43170, 3430],
];
const food = [[4, 1, 70, 90, 70, 20, 0, 150, 7],
[4, 2, 115, 150, 115, 35, 0, 440, 13],
[4, 3, 195, 250, 195, 55, 0, 900, 21],
[4, 4, 325, 420, 325, 95, 0, 1650, 31],
[4, 5, 545, 700, 545, 155, 0, 2830, 46],
[4, 6, 910, 1170, 910, 260, 1, 4730, 70],
[4, 7, 1520, 1950, 1520, 435, 1, 7780, 98],
[4, 8, 2535, 3260, 2535, 725, 1, 12640, 140],
[4, 9, 4235, 5445, 4235, 1210, 1, 20430, 203],
[4, 10, 7070, 9095, 7070, 2020, 1, 32880, 280],
[4, 11, 11810, 15185, 11810, 3375, 1, 52810, 392],
[4, 12, 19725, 25360, 19725, 5635, 1, 84700, 525],
[4, 13, 32940, 42350, 32940, 9410, 1, 49310, 693],
[4, 14, 55005, 70720, 55005, 15715, 1, 44540, 889],
[4, 15, 91860, 118105, 91860, 26245, 1, 2350, 1120],
[4, 16, 153405, 197240, 153405, 43830, 2, 38510, 1400],
[4, 17, 256190, 329385, 256190, 73195, 2, 27260, 1820],
[4, 18, 427835, 550075, 427835, 122240, 2, 43810, 2240],
[4, 19, 714485, 918625, 714485, 204140, 2, 35740, 2800],
[4, 20, 1193195, 1534105, 1193195, 340915, 2, 22830, 3430],
];
const cityhall = [[5, 1, 70, 40, 60, 20, 2, 2500, 100],
[5, 2, 90, 50, 75, 25, 1, 2620, 104],
[5, 3, 115, 65, 100, 35, 1, 3220, 108],
[5, 4, 145, 85, 125, 40, 1, 3880, 112],
[5, 5, 190, 105, 160, 55, 1, 4610, 116],
[5, 6, 240, 135, 205, 70, 2, 5410, 120],
[5, 7, 310, 175, 265, 90, 2, 6300, 125],
[5, 8, 395, 225, 340, 115, 2, 7280, 129],
[5, 9, 505, 290, 430, 145, 2, 8380, 134],
[5, 10, 645, 370, 555, 185, 2, 9590, 139],
[5, 11, 825, 470, 710, 235, 2, 10940, 144],
[5, 12, 1060, 605, 905, 300, 2, 12440, 150],
[5, 13, 1355, 775, 1160, 385, 2, 14120, 155],
[5, 14, 1735, 990, 1485, 495, 2, 15980, 161],
[5, 15, 2220, 1270, 1900, 635, 2, 18050, 167],
[5, 16, 2840, 1625, 2435, 810, 3, 20370, 173],
[5, 17, 3635, 2075, 3115, 1040, 3, 22950, 180],
[5, 18, 4650, 2660, 3990, 1330, 3, 25830, 187],
[5, 19, 5955, 3405, 5105, 1700, 3, 29040, 193],
[5, 20, 7620, 4355, 6535, 2180, 3, 32630, 201],
];
const warehouse = [[6, 1, 130, 160, 90, 40, 1, 2000, 1200],
[6, 2, 165, 205, 115, 50, 1, 2620, 1700],
[6, 3, 215, 260, 145, 65, 1, 3340, 2300],
[6, 4, 275, 335, 190, 85, 1, 4170, 3100],
[6, 5, 350, 430, 240, 105, 1, 5140, 4000],
[6, 6, 445, 550, 310, 135, 1, 6260, 5000],
[6, 7, 570, 705, 395, 175, 1, 7570, 6300],
[6, 8, 730, 900, 505, 225, 1, 9080, 7800],
[6, 9, 935, 1155, 650, 290, 1, 10830, 9600],
[6, 10, 1200, 1475, 830, 370, 1, 12860, 11800],
[6, 11, 1535, 1890, 1065, 470, 2, 15220, 14400],
[6, 12, 1965, 2420, 1360, 605, 2, 17950, 17600],
[6, 13, 2515, 3095, 1740, 775, 2, 21130, 21400],
[6, 14, 3220, 3960, 2230, 990, 2, 24810, 25900],
[6, 15, 4120, 5070, 2850, 1270, 2, 29080, 31300],
[6, 16, 5275, 6490, 3650, 1625, 2, 34030, 37900],
[6, 17, 6750, 8310, 4675, 2075, 2, 39770, 45700],
[6, 18, 8640, 10635, 5980, 2660, 2, 46440, 55100],
[6, 19, 11060, 13610, 7655, 3405, 2, 54170, 66400],
[6, 20, 14155, 17420, 9800, 4355, 2, 63130, 80000],
];
const barn = [[7, 1, 80, 100, 70, 20, 1, 1600, 1200],
[7, 2, 100, 130, 90, 25, 1, 2160, 1700],
[7, 3, 130, 165, 115, 35, 1, 2800, 2300],
[7, 4, 170, 210, 145, 40, 1, 3550, 3100],
[7, 5, 215, 270, 190, 55, 1, 4420, 4000],
[7, 6, 275, 345, 240, 70, 1, 5420, 5000],
[7, 7, 350, 440, 310, 90, 1, 6590, 6300],
[7, 8, 450, 565, 395, 115, 1, 7950, 7800],
[7, 9, 575, 720, 505, 145, 1, 9520, 9600],
[7, 10, 740, 920, 645, 185, 1, 11340, 11800],
[7, 11, 945, 1180, 825, 235, 2, 13450, 14400],
[7, 12, 1210, 1510, 1060, 300, 2, 15910, 17600],
[7, 13, 1545, 1935, 1355, 385, 2, 18750, 21400],
[7, 14, 1980, 2475, 1735, 495, 2, 22050, 25900],
[7, 15, 2535, 3170, 2220, 635, 2, 25880, 31300],
[7, 16, 3245, 4055, 2840, 810, 2, 30320, 37900],
[7, 17, 4155, 5190, 3635, 1040, 2, 35470, 45700],
[7, 18, 5315, 6645, 4650, 1330, 2, 41450, 55100],
[7, 19, 6805, 8505, 5955, 1700, 2, 48380, 66400],
[7, 20, 8710, 10890, 7620, 2180, 2, 56420, 80000],
];

const barracks = [[8, 1, 210, 140, 260, 120, 4, 2000, 100],
[8, 2, 270, 180, 335, 155, 2, 2620, 90], 
[8, 3, 345, 230, 425, 195, 2, 3340, 83], 
[8, 4, 440, 295, 545, 250, 2, 4170, 71], 
[8, 5, 565, 375, 700, 320, 2, 5140, 66], 
[8, 6, 720, 480, 895, 410, 3, 6260, 58], 
[8, 7, 925, 615, 1145, 530, 3, 7570, 52], 
[8, 8, 1180, 790, 1465, 675, 3, 9080, 47], 
[8, 9, 1515, 1010, 1875, 865, 3, 10830, 43], 
[8, 10, 1935, 1290, 2400, 1105, 3, 12860, 38], 
[8, 11, 2480, 1655, 3070, 1415, 3, 15220, 34], 
[8, 12, 3175, 2115, 3930, 1815, 3, 17950, 31], 
[8, 13, 4060, 2710, 5030, 2320, 3, 21130, 28], 
[8, 14, 5200, 3465, 6435, 2970, 3, 24810, 25], 
[8, 15, 6655, 4435, 8240, 3805, 3, 29080, 22], 
[8, 16, 8520, 5680, 10545, 4870, 4, 34030, 20], 
[8, 17, 10905, 7270, 13500, 6230, 4, 39770, 18], 
[8, 18, 13955, 9305, 17280, 7975, 4, 46440, 16], 
[8, 19, 17865, 11910, 22120, 10210, 4, 54170, 14], 
[8, 20, 22865, 15245, 28310, 13065, 4, 63130, 13]]
//the last param is the percentage of building time of the soldier, the building time is in the list below
// the barracks can build the soldiers, initially only Militia can be created
const stable = [[9, 1, 260, 140, 220, 100, 5, 2200, 100], 
[9, 2, 335, 180, 280, 130, 3, 2850, 90], 
[9, 3, 425, 230, 360, 165, 3, 3610, 83], 
[9, 4, 545, 295, 460, 210, 3, 4490, 71], 
[9, 5, 700, 375, 590, 270, 3, 5500, 66], 
[9, 6, 895, 480, 755, 345, 3, 6680, 58], 
[9, 7, 1145, 615, 970, 440, 3, 8050, 52], 
[9, 8, 1465, 790, 1240, 565, 3, 9640, 47], 
[9, 9, 1875, 1010, 1585, 720, 3, 11480, 43], 
[9, 10, 2400, 1290, 2030, 920, 3, 13620, 38], 
[9, 11, 3070, 1655, 2595, 1180, 4, 16100, 34], 
[9, 12, 3930, 2115, 3325, 1510, 4, 18980, 31], 
[9, 13, 5030, 2710, 4255, 1935, 4, 22310, 28], 
[9, 14, 6435, 3465, 5445, 2475, 4, 26180, 25], 
[9, 15, 8240, 4435, 6970, 3170, 4, 30670, 22], 
[9, 16, 10545, 5680, 8925, 4055, 4, 35880, 20], 
[9, 17, 13500, 7270, 11425, 5190, 4, 41920, 18], 
[9, 18, 17280, 9305, 14620, 6645, 4, 48930, 16], 
[9, 19, 22120, 11910, 18715, 8505, 4, 57060, 14], 
[9, 20, 28310, 15245, 23955, 10890, 4, 66490, 13]]
// stable can build the scouts and kinghts, initially only the scouts can be build
// the last parameter is the speed of creat a solidier, for example: player build 1 militia cost 1600 blocks
// when the stable was in level 1, the final time cost is 1600 blocks
// but in level 2, the final time cost is 1440 block (1600*90/100)
const college = [[10, 1, 220, 160, 90, 40, 4, 2000, 0],
[10, 2, 280, 205, 115, 50, 2, 2620, 0],
[10, 3, 360, 260, 145, 65, 2, 3340, 0],
[10, 4, 460, 335, 190, 85, 2, 4170, 0],
[10, 5, 590, 430, 240, 105, 2, 5140, 0],
[10, 6, 755, 550, 310, 135, 3, 6260, 0],
[10, 7, 970, 705, 395, 175, 3, 7570, 0],
[10, 8, 1240, 900, 505, 225, 3, 9080, 0],
[10, 9, 1585, 1155, 650, 290, 3, 10830, 0],
[10, 10, 2030, 1475, 830, 370, 3, 12860, 0],
[10, 11, 2595, 1890, 1065, 470, 3, 15220, 0],
[10, 12, 3325, 2420, 1360, 605, 3, 17950, 0],
[10, 13, 4255, 3095, 1740, 775, 3, 21130, 0],
[10, 14, 5445, 3960, 2230, 990, 3, 24810, 0],
[10, 15, 6970, 5070, 2850, 1270, 3, 29080, 0],
[10, 16, 8925, 6490, 3650, 1625, 4, 34030, 0],
[10, 17, 11425, 8310, 4675, 2075, 4, 39770, 0],
[10, 18, 14620, 10635, 5980, 2660, 4, 46440, 0],
[10, 19, 18715, 13610, 7655, 3405, 4, 54170, 0],
[10, 20, 23955, 17420, 9800, 4355, 4, 63130, 0]]
// college can develop mult types of soldiers, when in level 5 player can dev the Guard,10 can dev the Heavy Infantry,15 the Knights 20 the Heavy Knights
const embassy = [[11, 1, 180, 130, 150, 80, 3, 2000, 0],
[11, 2, 230, 165, 190, 100, 2, 2620, 0],
[11, 3, 295, 215, 245, 130, 2, 3340, 9],
[11, 4, 375, 275, 315, 170, 2, 4170, 12],
[11, 5, 485, 350, 405, 215, 2, 5140, 15],
[11, 6, 620, 445, 515, 275, 2, 6260, 18],
[11, 7, 790, 570, 660, 350, 2, 7570, 21],
[11, 8, 1015, 730, 845, 450, 2, 9080, 24],
[11, 9, 1295, 935, 1080, 575, 2, 10830, 27],
[11, 10, 1660, 1200, 1385, 740, 2, 12860, 30],
[11, 11, 2125, 1535, 1770, 945, 3, 15220, 33],
[11, 12, 2720, 1965, 2265, 1210, 3, 17950, 36],
[11, 13, 3480, 2515, 2900, 1545, 3, 21130, 39],
[11, 14, 4455, 3220, 3715, 1980, 3, 24810, 42],
[11, 15, 5705, 4120, 4755, 2535, 3, 29080, 45],
[11, 16, 7300, 5275, 6085, 3245, 3, 34030, 48],
[11, 17, 9345, 6750, 7790, 4155, 3, 39770, 51],
[11, 18, 11965, 8640, 9970, 5315, 3, 46440, 54],
[11, 19, 15315, 11060, 12760, 6805, 3, 54170, 57],
[11, 20, 19600, 14155, 16335, 8710, 3, 63130, 60]]
// player can join an alliance only after building an embassy, and player can create an alliance by creating an embassy of level 3 or higher.
// the last parameter is the count of allies that the player-created alliance can hold
const city_wall = [[12, 1, 110, 160, 70, 60, 0, 2000, 8002],
[12, 2, 140, 205, 90, 75, 0, 2620, 16005],
[12, 3, 180, 260, 115, 100, 0, 3340, 24007],
[12, 4, 230, 335, 145, 125, 0, 4170, 32010],
[12, 5, 295, 430, 190, 160, 0, 5140, 40013],
[12, 6, 380, 550, 240, 205, 1, 6260, 48016],
[12, 7, 485, 705, 310, 265, 1, 7570, 56018],
[12, 8, 620, 900, 395, 340, 1, 9080, 64021],
[12, 9, 795, 1155, 505, 430, 1, 10830, 72024],
[12, 10, 1015, 1475, 645, 555, 1, 12860, 80028],
[12, 11, 1300, 1890, 825, 710, 1, 15220, 88031],
[12, 12, 1660, 2420, 1060, 905, 1, 17950, 96034],
[12, 13, 2130, 3095, 1355, 1160, 1, 21130, 104037],
[12, 14, 2725, 3960, 1735, 1485, 1, 24810, 112041],
[12, 15, 3485, 5070, 2220, 1900, 1, 29080, 120044],
[12, 16, 4460, 6490, 2840, 2435, 2, 34030, 128048],
[12, 17, 5710, 8310, 3635, 3115, 2, 39770, 136052],
[12, 18, 7310, 10635, 4650, 3990, 2, 46440, 144056],
[12, 19, 9360, 13610, 5955, 5105, 2, 54170, 152059],
[12, 20, 11980, 17420, 7620, 6535, 2, 63130, 160063]]

// player can build the city wall to help soldiers in the city to defend
// the last two parameters is the additional attact power and the defense bonus percent
let soldiers = [
  [40, 35, 6, 50, 120, 100, 150, 30, 1, 1600], //Militia
  [30, 65, 5, 20, 100, 130, 160, 70, 1, 1760], //Guard
  [70, 40, 7, 50, 150, 160, 210, 80, 1, 1920], //Heavy Infantry
  [20, 20, 16, 0, 140, 160, 20, 40, 2, 1360],  //light cavalry
  [120, 65, 14, 100, 550, 440, 320, 100, 3, 2640], //Knights
  [180, 80, 10, 70, 550, 640, 800, 180, 4, 3520], //Heavy Knights
  [60, 30, 4, 0, 900, 360, 500, 70, 3, 4600],
  [75, 60, 3, 0, 950, 1350, 600, 90, 6, 9000],
  [50, 40, 4, 0, 30750, 27200, 45000, 37500, 5, 4300],
  [0, 80, 5, 3000, 4600, 4200, 5800, 4400, 1, 26900]
]

// the first 6 soldier build info is for Militia, Guard, Heavy Infantry, light cavalry, Knights, Heavy Knights
// The information in the list is: attack power, defense power, movement speed, load capacity, wood, bricks, steel, food, population occupied by soldiers, and time required to build.

// chain wood, brick, stell, food, cityhall, warehouse, barn into a big list
const data = wood.concat(brick, steel, food, cityhall, warehouse, barn, barracks, stable, college, embassy, city_wall);


const leaves = data.map((d) =>
  hash_posei(d)
);

const tree = new merkle.MerkleTree(leaves, hash.computePoseidonHash);
console.log("root: ", tree.root)

const h = hash_posei([1, 1, 40, 100, 50, 60, 2, 260, 7])
console.log("h: ", h)
const proof = tree.getProof(h);
console.log("proof: ", proof)



function write_upgrade_proof (data, name) {
  const content = data.map((d) => {
    const hash_value = hash_posei(d)
    const proof = tree.getProof(hash_value)
    const content = `fn ${name}_level${d[1]}_proof() -> Array<felt252> {
    array![
        ${proof}
    ]
}`
    return content
  })
  return content.join("\n")
}

function write_all_upgrade_proof(){
  const wood_content = write_upgrade_proof(wood, "wood")
  const brick_content = write_upgrade_proof(brick, "brick")
  const steel_content = write_upgrade_proof(steel, "steel")
  const food_content = write_upgrade_proof(food, "food")
  const cityhall_content = write_upgrade_proof(cityhall, "cityhall")
  const warehouse_content = write_upgrade_proof(warehouse, "warehouse")
  const barn_content = write_upgrade_proof(barn, "barn")
  const barrack_content = write_upgrade_proof(barracks, "barrack")
  const stable_content = write_upgrade_proof(stable, "stable")
  const college_content = write_upgrade_proof(college, "college")
  const embassy_content = write_upgrade_proof(embassy, "embassy")
  const city_wall_content = write_upgrade_proof(city_wall, "city_wall")

  const content = `${wood_content}\n${brick_content}\n${steel_content}\n${food_content}\n${cityhall_content}\n${warehouse_content}\n${barn_content}\n${barrack_content}\n${stable_content}\n${college_content}\n${embassy_content}\n${city_wall_content}`
  fs.writeFileSync('./src/tests/upgrade_proof.cairo', content);
}

write_all_upgrade_proof()


function write_upgrade_function (data, name) {
  const content = data.map((d) => {
    const content = `fn level${d[1]}_${name}(context: TestContext, position: u64, player: ContractAddress){
    set_caller_address(player);
    context
        .kingdom_lord_test
        .start_upgrade_test(
            position, ${d[0]}, ${d[1]}, ${d[2]}, ${d[3]}, ${d[4]}, ${d[5]}, ${d[6]}, ${d[7]}, ${d[8]},
            ${name}_level${d[1]}_proof()
        )
        .expect('construct ${name} level ${d[1]}');
    increase_time(${d[7]});
    let res = context.kingdom_lord_test.finish_upgrade_test();
    res.expect('${name} level ${d[1]} done');
}`
    return content
  })
  return content.join("\n")
}

function write_use_proof_header(data, name){
  const content = data.map((d) => {
    const hash_value = hash_posei(d)
    const proof = tree.getProof(hash_value)
    const content = `use kingdom_lord::tests::upgrade_proof::${name}_level${d[1]}_proof;`
    return content
  })
  return content.join("\n")
}

function write_all_upgrade(){
  const wood_content = write_upgrade_function(wood, "wood")
  const brick_content = write_upgrade_function(brick, "brick")
  const steel_content = write_upgrade_function(steel, "steel")
  const food_content = write_upgrade_function(food, "food")
  const cityhall_content = write_upgrade_function(cityhall, "cityhall")
  const warehouse_content = write_upgrade_function(warehouse, "warehouse")
  const barn_content = write_upgrade_function(barn, "barn")
  const barrack_content = write_upgrade_function(barracks, "barrack")
  const stable_content = write_upgrade_function(stable, "stable")
  const college_content = write_upgrade_function(college, "college")
  const embassy_content = write_upgrade_function(embassy, "embassy")
  const city_wall_content = write_upgrade_function(city_wall, "city_wall")

  const wood_header = write_use_proof_header(wood, "wood")
  const brick_header = write_use_proof_header(brick, "brick")
  const steel_header = write_use_proof_header(steel, "steel")
  const food_header = write_use_proof_header(food, "food")
  const cityhall_header = write_use_proof_header(cityhall, "cityhall")
  const warehouse_header = write_use_proof_header(warehouse, "warehouse")
  const barn_header = write_use_proof_header(barn, "barn")
  const barrack_header = write_use_proof_header(barracks, "barrack")
  const stable_header = write_use_proof_header(stable, "stable")
  const college_header = write_use_proof_header(college, "college")
  const embassy_header = write_use_proof_header(embassy, "embassy")
  const city_wall_header = write_use_proof_header(city_wall, "city_wall")

  const header = `use kingdom_lord::tests::utils::{increase_time, TestContext};
use starknet::ContractAddress;
use starknet::testing::set_caller_address;
use kingdom_lord::interface::{
    IKingdomLordDispatcher, IKingdomLordAdminDispatcher, IKingdomLordAdmin,IKingdomLordTestDispatcherImpl, 
    IKingdomLordLibraryDispatcherImpl, IKingdomLordAdminDispatcherImpl, IKingdomLordDispatcherTrait, IKingdomLordTestDispatcher
};`

  const content = `${header}
${wood_header}
${brick_header}
${steel_header}
${food_header}
${cityhall_header}
${warehouse_header}
${barn_header}
${barrack_header}
${stable_header}
${college_header}
${embassy_header}
${city_wall_header}
${wood_content}
${brick_content}
${steel_content}
${food_content}
${cityhall_content}
${warehouse_content}
${barn_content}
${barrack_content}
${stable_content}
${college_content}
${embassy_content}
${city_wall_content}`
  fs.writeFileSync('./src/tests/upgrade_func.cairo', content);
}

write_all_upgrade()