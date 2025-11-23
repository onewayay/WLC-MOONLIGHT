import json
import re
from tika import parser
import googletrans

translator = googletrans.Translator()

# str1 = "개발을 잘하고 싶습니다."
# result1 = translator.translate(str1, src='ko', dest='en')

# str2 = "I like beer."
# result2 = translator.translate(str2, src='en', dest='ko')

def trans_func():
    dic_list = {}
    txt_list = {}
    list_99 = ['1', '2', '3', '4', '5', '6', '7', '8']
    answer_num = "0"
    temp_num = "0"
    line_pass = True
    kor_list = []
    line_num = 0
    with open("WLC_KOR4.txt", "r") as f:
        for line in f:
            kor_list.append(line)

    with open("WLC_ENG4.txt", "r") as f:
        for line in f:
            kor_line = kor_list[line_num]
            line_num = line_num + 1
            if kor_line != "\n":
                if "Q." in kor_line:
                    line_type = "Q"
                    temp = kor_line.split('. ')
                    temp_num = int(temp[1])
                    dic_list[temp_num] = {}

                    question_num = temp[0]
                    txt_list[question_num] = []
                    txt_list[question_num].append(temp[2])
                    dic_list[temp_num][question_num] = txt_list[question_num]

                    answer_num = "A"
                    ref_num = "ref"
                    txt_list[answer_num] = []
                    txt_list[ref_num] = []

                elif "A." in kor_line or line_type == "A":
                    line_type = "A"
                    line = line.split("A. ")[-1]
                    kor_line = kor_line.split("A. ")[-1]
                    numbers = re.findall(r'\d+', line)

                    if numbers:
                        for num in numbers:
                            line_pass = True
                            if temp_num == 99 and num in list_99:
                                if len(numbers) == 1:
                                    # txt_list[answer_num].append(kor_line)
                                    # dic_list[temp_num][answer_num] = txt_list[answer_num]
                                    line_pass = False
                            else:
                                txt_list[answer_num].append("[" + num + "]")
                                dic_list[temp_num][answer_num] = txt_list[answer_num]

                                line = line.split(num)[-1].lstrip()
                                txt_list[ref_num].append(int(num))
                                dic_list[temp_num][ref_num] = txt_list[ref_num]

                        # if line and line_pass:
                        #     txt_list[answer_num].append(line)
                        #     dic_list[temp_num][answer_num] = txt_list[answer_num]
                    # else:
                    #     txt_list[answer_num].append(kor_line)
                    #     dic_list[temp_num][answer_num] = txt_list[answer_num]

                    txt_list[answer_num].append(kor_line)
                    dic_list[temp_num][answer_num] = txt_list[answer_num]

                elif line_type == "Q" and kor_line:
                    txt_list[question_num].append(kor_line)
                    dic_list[temp_num][question_num] = txt_list[question_num]

    page_list = {}
    page_num = 1
    for temp_num in dic_list:
        page_list[str(page_num)] = dic_list[temp_num]

    file_path = "WLC_KOR4.json"
    with open(file_path, 'w', encoding='utf-8') as outfile:
        json.dump(dic_list, outfile, indent=4, ensure_ascii=False)


def KOR_func():
    dic_list = {}
    txt_list = {}
    answer_num = "0"
    temp_num = "0"
    ref_list = []
    with open("WLC_KOR4.txt", "r") as f:
        for line in f:
            if line != "\n":
                if "Q." in line:
                    line_type = "Q"

                    temp = line.split('. ')
                    temp_num = int(temp[1])
                    dic_list[temp_num] = {}

                    question_num = temp[0]
                    txt_list[question_num] = []
                    txt_list[question_num].append(temp[2])
                    dic_list[temp_num][question_num] = txt_list[question_num]

                    answer_num = "A"
                    txt_list[answer_num] = []

                elif "A." in line or line_type == "A":
                    line_type = "A"
                    line = line.split("A. ")[-1]
                    txt_list[answer_num].append(line)
                    dic_list[temp_num][answer_num] = txt_list[answer_num]

                elif line_type == "Q" and line:
                    txt_list[question_num].append(line)
                    dic_list[temp_num][question_num] = txt_list[question_num]

    page_list = {}
    page_num = 1
    for temp_num in dic_list:
        page_list[str(page_num)] = dic_list[temp_num]

    file_path = "WLC_KOR4.json"
    with open(file_path, 'w', encoding='utf-8') as outfile:
        json.dump(dic_list, outfile, indent=4, ensure_ascii=False)

def ENG_func():
    dic_list = {}
    txt_list = {}
    list_99 = ['1', '2', '3', '4', '5', '6', '7', '8']
    answer_num = "0"
    temp_num = "0"
    line_pass = True

    with open("WLC_ENG4.txt", "r") as f:
        for line in f:
            line = line
            if line != "\n":
                if "Q." in line:
                    line_type = "Q"
                    temp = line.split('. ')
                    temp_num = int(temp[1])
                    dic_list[temp_num] = {}

                    question_num = temp[0]
                    txt_list[question_num] = []
                    txt_list[question_num].append(temp[2])
                    dic_list[temp_num][question_num] = txt_list[question_num]

                    answer_num = "A"
                    ref_num = "ref"
                    txt_list[answer_num] = []
                    txt_list[ref_num] = []

                elif "A." in line or line_type == "A":
                    line_type = "A"
                    line = line.split("A. ")[-1]

                    numbers = re.findall(r'\d+', line)

                    if numbers:
                        for num in numbers:
                            line_pass = True
                            if temp_num == 99 and num in list_99:
                                if len(numbers) == 1:
                                    txt_list[answer_num].append(line)
                                    dic_list[temp_num][answer_num] = txt_list[answer_num]
                                    line_pass = False
                            else:
                                txt_list[answer_num].append(line.split(num)[0])
                                dic_list[temp_num][answer_num] = txt_list[answer_num]

                                temps = ""
                                if len(line.split(num)) > 1 and line.split(num)[1] == "\n":
                                    temps = "\n"
                                txt_list[answer_num].append(" [" + num + "] " + temps)
                                dic_list[temp_num][answer_num] = txt_list[answer_num]

                                line = line.split(num)[-1].lstrip()
                                txt_list[ref_num].append(int(num))
                                dic_list[temp_num][ref_num] = txt_list[ref_num]

                        if line and line_pass:
                            txt_list[answer_num].append(line)
                            dic_list[temp_num][answer_num] = txt_list[answer_num]
                    else:
                        txt_list[answer_num].append(line)
                        dic_list[temp_num][answer_num] = txt_list[answer_num]

                elif line_type == "Q" and line:
                    txt_list[question_num].append(line)
                    dic_list[temp_num][question_num] = txt_list[question_num]

    page_list = {}
    page_num = 1
    for temp_num in dic_list:
        page_list[str(page_num)] = dic_list[temp_num]

    file_path = "WLC_ENG4.json"
    with open(file_path, 'w', encoding='utf-8') as outfile:
        json.dump(dic_list, outfile, indent=4, ensure_ascii=False)

def pdf_out_txt():
    pdf_path = "./WLC-service/data/Westminster-Larger-Catechism.pdf"
    parsed = parser.from_file(pdf_path)
    txt = open('output.txt', 'w', encoding='utf-8')
    print(parsed['content'], file=txt)
    txt.close()

def txt_to_txt():
    txt_line = []
    line_num = 188
    line_pass = False
    # with open("WLC-service/data/output.txt", "r") as f:
    with open("WLC_KOR4.txt", "r") as f:
        for line in f:
            #pdf 파일 변환
            # if line != "\n":
            #     numbers = re.findall(r'\d+', line)
            #     if numbers:
            #         if numbers[0] != line.strip():
            #             txt_line.append(line)
            #     else:
            #         txt_line.append(line)

            # LSEP 삭제 파일 변환
            if "[LSEP]" in line:
                temp_line = line.replace("[LSEP]", "")
                txt_line.append(temp_line)
            else:
                txt_line.append(line)

            # if "Q. 57" in line:
            #     line_pass = False
            # elif "Q. 48" in line:
            #     line_pass = True
            #
            # if ":" in line and line_pass:
            #     temp_line = line + "     ----    " + str(line_num) + '\n'
            #     # temp_line = line + "     <<<<    " + str(line_num) + '\n'
            #     txt_line.append(temp_line)
            #     line_num = line_num + 1;
            # # elif "----" in line:
            # elif "<<<<" in line:
            #     pass
            # else:
            #     txt_line.append(line)


    with open("WLC_KOR4.txt", "w") as f:
        for txt in txt_line:
            f.write(txt)

def bible_kor_func():
    # file = open('wlc_bible_kor.json')
    file = open('wlc_bible_eng.json')
    jsonString = json.load(file)

    txt_list = {}
    for str in jsonString:
        # if str['번호'] in txt_list:
        #     temp = '\n' + str['성경구절']
        #     txt_list[str['번호']].append(temp)
        # else:
        #     txt_list[str['번호']] = [str['성경구절']]
        if str['각주'] in txt_list:
            temp = '\n' + str['KJV']
            txt_list[str['각주']].append(temp)
        else:
            txt_list[str['각주']] = [str['KJV']]

    print(txt_list)
    file_path = "test2.json"
    with open(file_path, 'w', encoding='utf-8') as outfile:
        json.dump(txt_list, outfile, indent=4, ensure_ascii=False)


if __name__ == '__main__':
    # KOR_func()
    # ENG_func()
    # bible_kor_func()
    # txt_to_txt()
    # trans_func()
    file = open('WLC_ENG4.json')
    jsonString = json.load(file)

    txt_list = {}
    for str in jsonString:
        if not 'ref' in jsonString[str]:
            print(str)
