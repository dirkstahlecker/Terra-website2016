import operator
from operator import itemgetter

class WordClass:
    wordDict = {} #{word: number of appearances}
    wordPerDay= {}
    #punctuation = ['.',',',';',':','\'','/','(',')',':']
    goodChars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n',
                     'o','p','q','r','s','t','u','v','w','x','y','z','-','\'']
                #letters, numbers, dash, apostrophe only
    numbers = ['1','2','3','4','5','6','7','8','9','0']
    doc = ''
    outToFile = ''
    outFilePath = '/Volumes/Disk Image/output.txt'
    printWhere = 'screen'
    date = ''
    day = 0
    highestNumSeem = 0 #holds the number associated with the most frequent word
    mostFrequentWord = '' 
    namesList = []
    #wpd = True #word per day enable flag //not used currently

    #initializes file, makes line breaks into spaces, calls parse to isolate words
    def __init__(self, filename, io, wpd): #io is r for readable, etc
        tempFile = open(filename, io)
        self.doc = tempFile.read().replace('\n', ' ') #holds all the text
        tempFile.close()
        self.parse(wpd)
        self.importNames()
        self.namesList = self.removeDuplicates(self.namesList)
        self.combineNames()
        #self.combineIntoRoot()

    #called once from constructor to import namesList from a text file
    def importNames(self):
        tempFile = open('names.txt', 'r')
        doc = tempFile.read().replace('\n',' ')
        doc += ' ' #add space at end to get final name
        tempFile.close()

        #fill namesList
        word = ''
        for char in doc:
            if char == ' ' and word != '':
                if word not in self.namesList:
                    self.namesList.append(word)
                word = ''
            else:
                word += char
        self.writeNames()

    def writeNames(self):
        tempFile = open('names.txt', 'w')
        #write back to file after removing duplicates
        for name in self.namesList:
            tempFile.write(name + '\n')
        tempFile.close()

    def removeDuplicates(self,alist):
        blist = []
        for i in alist:
            if i not in blist:
                blist.append(i)
        return blist

    #helper to parse words read from a file into a list of words
    def stringIntoWordList(self, inpStr):
        word = ''
        wordList = []
        for char in inpStr:
            if char == ' ' and word != '':
                wordList.append(word)
                word = ''
            else:
                word += char
        wordList.append(word)
        return wordList


    def dateForm(self,date):
        valid = True
        if len(date) < 7:
            valid = False
        elif len(date) > 8:
            valid = False
        else:
            for i in date[1:]: #ignore first digit - don't care if it's something else
                if i !='-' and i not in self.numbers:
                    valid = False
            if (date[1] != '-' and date[2] != '-') or (date[-3] != '-'):
                valid = False
            return valid

    #for manipulating names list through object
    def addName(self, name):
        tempFile = open('names.txt', 'a')
        tempFile.write(name + '\n')
        self.namesList.append(name)
        tempFile.close()

    #for manipulating names list through object
    def removeName(self, name):
        try:
            self.namesList.remove(name)
            self.writeNames()
        except:
            print 'Error: name not in list'

    #currently unused
    def setWPD(self,wpd):
        self.wpd = wpd

    #determines if the word is valid
    #removes punctuation, checks single letters, invalid chars
    #returns either the word or an empty string
    def checkWord(self, word):
        word = word.lower()
        valid = True
        
        #remove punctuation from after words
        if word == ' ' or word == '':
            valid = False
        elif len(word) > 2:
            if word[-1] not in self.goodChars:
                word = word[:-1]
                self.checkWord(word)
            if word[0] not in self.goodChars:
                word = word[1:]
                self.checkWord(word)
        elif len(word) == 1:
            if word != 'a' and word != 'i':
                valid = False

        for letter in word:
            if letter.lower() not in self.goodChars:
                valid = False
                break

        if valid:
            return word
        else:
            return ''

    def addToDate(self, char):
        self.date += char
        if len(self.date) > 8: #too long, remove first character
            self.date = self.date[1:]

    def parse(self, wpd):
        word = ''
        upper = False #whether or not a letter was originally uppercase
        for char1 in self.doc:
            char = char1.lower()
            if char != char1:
                upper = True

            #run date checking simultaneous with normal parse
            self.addToDate(char)
            if self.dateForm(self.date):
                self.day += 1
                
            if word == '': # word is empty
                if char in self.goodChars:
                    word+= char
            else: #word not empty
                if char == ' ' or char == '\n' or char not in self.goodChars: #between words
                    self.placeWord(word)
                    if wpd:
                        self.placeWordPerDay(word,self.day)
                    word = ''
                else:
                    word += char

        #places the last word, as the file ends        
        self.placeWord(word)
        if wpd:
            self.placeWordPerDay(word,self.day)

    #puts word in dictionary, or +1 count if already there
    def placeWord(self,word):
        if len(word) > 2:
            if word[-2] == '\'':
                word = word[:-2]
        validWord = self.checkWord(word)
        if validWord != '':
            if validWord in self.wordDict: #add count if already existant
                self.wordDict[validWord] += 1
            else: #add word if not there
                self.wordDict[validWord] = 1

    #wordPerDay is {'name', (number, last occurance)}
    #Fully functional!!
    def printWPD(self):
        wpdDict = {}
        wpdList = []

        #put name and count into a dictionary
        for i in self.wordPerDay:
            (p,r) = self.wordPerDay[i]
            wpdList.append((p,i,r))

        sortedWPD = sorted(wpdList, key=itemgetter(0))
        
        #take the new dictionary and put into a list, as a tuple
        '''for j in wpdDict:
            wpdList.append((j,wpdDict[j]))
        wpdList = sorted(wpdList)

        #sort dictionary by number of days, without losing information
        sortedDict = wpdDict.sorted()'''

        #print the sorted names
        print "How many unique days in which a name appears:"
        for k in sortedWPD:
            (c,name,r) = k
            print c, name,
            print '('+str(r)+')'
        
    
    def placeWordPerDay(self,word,dayNum):
        #print word, dayNum
        if len(word) > 2:
            if word[-2] == '\'':
                word = word[:-2]
        validWord = self.checkWord(word)
        if validWord != '' and validWord in self.namesList: #screens for names
            if validWord in self.wordPerDay: #add count if already existant
                #print self.wordPerDay
                (d,r) = self.wordPerDay[validWord]
                if r < dayNum: #if the word hasn't been used this day
                    #print "r > dayNum"
                    self.wordPerDay[validWord] = (d+1,dayNum)
                
            else: #add word if not there
                self.wordPerDay[word] = (1,dayNum)
        #no else because we don't care about it if it isn't a name                     

    def sortHighest(self):
        wordNumLists = {} #dictionary of lists
        highest = 0
        highestWord = ''
        for word in self.wordDict:
            currentValue = self.wordDict[word]
            if currentValue not in wordNumLists:
                wordNumLists[currentValue] = []
            wordNumLists[currentValue].append(word)
            if currentValue > highest:
                highest = currentValue
                highestWord = word
        self.highestNumSeen = highest
        self.mostFrequentWord = highestWord
        return wordNumLists

    #prints lowest currently
    def printHighest(self, num = 20):
        wordLists = self.sortHighest()
        #wordlists is {number: ['words with','that number of instances']}
        count = 1
        done = False

        topWords = ''
        for x in reversed(sorted(wordLists)):
            if done:
                break
            for y in reversed(sorted(wordLists[x])):
                if self.printWhere == 'screen':
                    print x, y
                else:
                    self.outToFile += str(x) + str(y)
                if count == num:
                    done = True
                    break
                count += 1


    def printLowest(self, num = 20):
        wordLists = self.sortHighest()
        #wordlists is {number: ['words with','that number of instances']}
        count = 1
        done = False
        for x in sorted(wordLists):
            if done:
                break
            for y in sorted(wordLists[x]):
                if self.printWhere == 'screen':
                    print x, y
                else:
                    self.outToFile += str(x) + str(y)
                if count == num:
                    done = True
                    break
                count += 1

    def combineWords(self, keep, remove):
        if keep in self.wordDict and remove in self.wordDict:
            num = self.wordDict[remove]
            temp = self.wordDict.pop(remove)
            self.wordDict[keep] += num

    #only called from constructor
    def combineNames(self):
        self.combineWords('cait','caitlin')
        self.combineWords('becca','rebecca')
        self.combineWords('beck','beckett')

        
    def printNames(self):
        wordLists = self.sortHighest() # {number, [words appearing that many times]}
            
        for x in sorted(wordLists): # x is int
            for y in wordLists[x]: # y is str
                if y in self.namesList:
                    if self.printWhere == 'screen':
                        print x, y
                    else:
                        self.outToFile += str(x) + str(y)

    #returns how many times a word appears
    def lookUp(self,word):
        word = word.lower()
        if self.checkWord(word) == '' and printWhere == 'screen':
            print "Please enter a valid word"
        else:
            if self.printWhere == 'screen':
                print str(word) + ':',
                try:
                    print self.wordDict[word]
                except:
                    print "word not found"
            else:
                self.outToFile += str(word) + ':'
                self.outToFile += str(self.wordDict[word])

    #takes in a number, prints all the words that appear that many times
    def printNumber(self,num):
        wordLists = self.sortHighest()
        for i in wordLists:
            if i == num:
                for j in sorted(wordLists[i]):
                    if self.printWhere == 'screen':
                        print j
                    else:
                        outToFile += str(j)
                break

    def outputFile(self, write=False, src='', clear=False):
        if src != '':
            self.printWhere = src

        if write:
            tempFile = open(self.outFilePath,'a')
            tempFile.write(self.outToFile)
            tempFile.close()
            
        if clear:
            tempFile = open(self.outFilePath,'w')
            tempFile.close()



class Suffix(WordClass):

    #combine forms together into just root word
    #store data in text files for each ending
    def combineIntoRoot(self):
        #execute the combination
        edFile = open('ed.txt','r')
        tempWords = edFile.read().replace('\n', ' ')
        edFile.close()
        edWords = self.stringIntoWordList(tempWords)
        for word in edWords:
            self.combineWords(word, word+'ed')

    def findSuffix(self, suffix):
        #disregards input at the moment
        #ed
        tempFile = open('ed.txt','a')
        
        #doesn't work for words ending in 'e' like 'taped'
        edExceptList = ['tim','levi','grad','lin','car','not','tri','us','tap']
        for word in self.wordDict:
            if word+'ed' in self.wordDict and word[-1] != 'e' and word not in edExceptList:
                edFile.write(word + '\n')
        edFile.close()                               





#NOT FUNCTIONAL
class Analyze(WordClass):
    commonWords = ['and','the','or','but','with','a','an','nice','cool','neat',
                   'which','was','is','our','here','there','their','theyre',
                   'for','his','her','he','she','fun','cool','i','we','then',
                   'went','with','saw','while','to','it','got','came','have',
                   'had','lot','many','good','really','its','at','some',
                   'point','alright','got','back']
    relatedWords = {}
    def __init__(self):
        self.commonWords = self.removeDuplicates(self.commonWords)
    def analyze(self,seed):
        pass
    def test(self):
        pass
    def length(self):
        pass
     



w = WordClass('/Volumes/Disk Image/journal.rtf','r', True)
#s = Suffix()
#w = WordClass('/Volumes/Disk Image/test.rtf','r')

#w.printNames()
#w.printWPD()
#print w.wordPerDay
#w.printNames()
w.printHighest(25)
#w.printNumber(5)
#s.combineIntoRoots()




'''
w.outputFile(src='doc')
w.printNames()
w.outputFile(write=True)
w.outputFile(src='screen')
print 'finished'
'''
'''
a = Analyze('/Volumes/Disk Image/journal.rtf','r') #valid function call

a.test()
'''


''' TO ADD
case sensitivity to pick out names such as lane and chase
both look for word and look for word in other word
use context to figure out the difference between people of the same name
(kidna done) output statistics to a text file available for recall
check which words appear frequently around names and use probabilities to decide which
    person a name refers to
allow lookup to combine tenses (ex. play and played both come up for 'play')
    -easy to do with combineNames method
Optimize to run quickly
run wpd analysis only when called and only on what it is called for
expand wpd to work for all words
look for last names to distinguish names
"doesn" is a word
check words against dictionary and output words that aren't in dictionary
'''
