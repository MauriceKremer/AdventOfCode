package main

import (
	"bufio"
	"fmt"
	"os"
)

func findNumberAsText(line string, start int) int {
	numbers := map[string]int{
		"one":   1,
		"two":   2,
		"three": 3,
		"four":  4,
		"five":  5,
		"six":   6,
		"seven": 7,
		"eight": 8,
		"nine":  9,
		"zero":  0,
	}
	for key, value := range numbers {
		if len(key)+start > len(line) {
			continue
		}

		if string(line[start:start+len(key)]) == key {
			return value
		}
	}
	return -1
}

func getLineIntegers(line string) []int {
	var integers []int
	for i, s := range line {

		numb := findNumberAsText(line, i)
		if numb != -1 {
			integers = append(integers, numb)
		} else if s >= '0' && s <= '9' && numb == -1 {
			integers = append(integers, int(s-'0'))
		}
	}
	return integers
}

func main() {
	readfile, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
	}
	scanner := bufio.NewScanner(readfile)
	sum := 0
	for scanner.Scan() {
		//	fmt.Println(scanner.Text())
		integers := getLineIntegers(scanner.Text())
		number := integers[0]*10 + integers[len(integers)-1]
		sum += number
	}
	fmt.Println(sum)
}
