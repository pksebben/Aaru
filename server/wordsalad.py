import random

vowels = ["a","e","o","u","y","i"]
consonants = ["q","w","r","t","y","p","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"]

def word(length = None):
    if length is None:
        length = random.choice([random.randint(1,2), random.randint(1,3), random.randint(1,5), random.randint(1,10), random.randint(1,15)])
    letter = random.choice(vowels + consonants)
    word = ""
    word = word + letter
    for i in range(length):
        if letter in vowels:
            letter = random.choice([random.choice(vowels), random.choice(consonants)])
        else:
            if letter == "q":
                letter = "u"
            elif letter in ["t","s","c","p","w"]:
                letter = random.choice(["h","r",random.choice(vowels)])
            elif letter in ["b","d","f","g"]:
                letter = random.choice(["r",random.choice(vowels)])
            else:
                letter = random.choice(vowels)
        word = word + letter
    word = word + random.choice(['s','er','ish','y','','','','','','\'s'])
    return word

def sentence(length = None):
    if length is None:
        length = random.randint(5,30)
    sentence = []
    for i in range(length):
        sentence.append(' ')
        sentence.append(word())
    sentence.insert(random.randint(3,len(sentence) - 1), random.choice(['','','',',',';',',']))
    sentence.append(random.choice(['!  ','.  ','?  ','.  ','.  ','.  ']))
    return ''.join(sentence)
        
def paragraph(length = None):
    paragraph = []
    paragraph.append('    ')
    if length is None:
        length = random.randint(2,6)
    for i in range(length):
        paragraph.append(sentence())
    return ''.join(paragraph)
    
def story(length = None):
    story = []
    if length is None:
        length = random.randint(10,50)
    for i in range(length):
        story.append(paragraph())
        story.append('\n')
    return ''.join(story)
