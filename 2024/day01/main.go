package main

import (
	"bufio"
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"
)

func main() {
	readfile, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer readfile.Close()

	scanner := bufio.NewScanner(readfile)
	var numbers1 []int64
	var numbers2 []int64

	for scanner.Scan() {
		lineParts := strings.Fields(scanner.Text())
		for index, numstr := range lineParts {
			number, _ := strconv.ParseInt(numstr, 10, 64)
			if index == 0 {
				numbers1 = append(numbers1, number)
			} else {
				numbers2 = append(numbers2, number)
			}
		}
	}

	//sort numbers
	slices.Sort(numbers1)
	slices.Sort(numbers2)
	var diff int64
	diff = 0
	for i, _ := range numbers1 {
		diff += abs(numbers1[i] - numbers2[i])
	}
	fmt.Println(diff)
}

func abs(x int64) int64 {
	if x < 0 {
		return -x
	}
	return x
}
