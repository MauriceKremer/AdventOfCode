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
	}
	scanner := bufio.NewScanner(readfile)
	var numbers1 []int64
	var numbers2 []int64

	for scanner.Scan() {
		strings.Fields(scanner.Text())
		for index, numstr := range strings.Fields(scanner.Text()) {
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
	for _, n := range numbers1 {
		count := 0
		for _, m := range numbers2 {
			if n == m {
				count += 1
			} else if m > n {
				break
			}
		}
		diff += int64(count) * n
	}
	fmt.Println(diff)
}
