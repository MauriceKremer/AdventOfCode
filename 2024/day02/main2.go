package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func getLineIntegers(line string) []int {
	var integers []int
	for _, s := range strings.Fields(line) {
		i, _ := strconv.Atoi(s)
		integers = append(integers, i)
	}
	return integers
}

// check is all elements are true
func allTrue(arr []bool) bool {
	for _, v := range arr {
		if !v {
			return false
		}
	}
	return true
}

// remove element from array while retaining old array
// // slice method modifies the original array :-O
func removeElement(integers []int, s int) []int {
	result := []int{}
	for i := 0; i < len(integers); i++ {
		if i == s {
			continue
		}
		result = append(result, integers[i])
	}
	return result
}

func isSafe(integers []int) bool {
	var increasing []bool
	var decreasing []bool
	for i := 0; i < len(integers)-1; i++ {
		var diff = integers[i] - integers[i+1]
		increasing = append(increasing, 0 < diff && diff < 4)
		decreasing = append(decreasing, diff < 0 && diff > -4)
	}
	return allTrue(increasing) || allTrue(decreasing)
}

func main() {
	readfile, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer readfile.Close()

	scanner := bufio.NewScanner(readfile)
	var countGood = 0
	for scanner.Scan() {
		integers := getLineIntegers(scanner.Text())

		safe := isSafe(integers)
		if safe {
			countGood += 1
		} else {
			for i := 0; i < len(integers); i++ {
				remainder := removeElement(integers, i)
				safe = isSafe(remainder)
				if safe {
					countGood += 1
					break
				}
			}
		}
	}
	fmt.Println(countGood)

}

//493
//472
