package main

import (
	"bufio"
	"fmt"
	"os"
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

	score := 0
	for scanner.Scan() {
		line := scanner.Text()

		lineParts := strings.Split(line, ": ")

		totalValue, _ := strconv.Atoi(lineParts[0])
		var values []int
		for _, s := range strings.Split(lineParts[1], " ") {
			i, _ := strconv.Atoi(s)
			values = append(values, i)
		}

		answers := calc(values)
		if contains(answers, totalValue) {
			score += totalValue
		}

	}

	fmt.Println(score)
}

func calc(values []int) []int {

	if len(values) == 1 {
		return values
	}

	val1 := values[0]
	val2 := values[1]
	result := []int{}

	if len(values) == 2 {
		result := []int{val1 + val2, val1 * val2, joinNumbers(val1, val2)}
		return result
	} else {
		plusResult := []int{val1 + val2}
		plusResult = append(plusResult, values[2:]...)
		multiplyResult := []int{val1 * val2}
		multiplyResult = append(multiplyResult, values[2:]...)

		joinResult := []int{joinNumbers(val1, val2)}
		joinResult = append(joinResult, values[2:]...)

		result = calc(plusResult)
		result = append(result, calc(multiplyResult)...)
		result = append(result, calc(joinResult)...)
	}

	return result
}

func joinNumbers(a int, b int) int {
	result := a
	textNum := strconv.Itoa(b)
	for i := 0; i < len(textNum); i++ {
		result *= 10
	}
	return result + b
}

func contains(lst []int, value int) bool {
	for _, v := range lst {
		if v == value {
			return true
		}
	}
	return false
}
