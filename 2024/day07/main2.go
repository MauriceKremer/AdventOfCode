package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	readfile, err := os.Open("sample.txt")
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

		answers := calc(values, totalValue)
		fmt.Println(values, totalValue, answers)
		if contains(answers, totalValue) {
			score += totalValue
		} else {
			fmt.Println("hmmm what now", len(values)-1)
			for i := 1; i < len(values); i++ {

				part1 := append([]int{}, values[:i]...)
				part2 := append([]int{}, values[i:]...)
				fmt.Println(part1, part2)
				answers1 := calc(part1, totalValue)
				answers2 := calc(part2, totalValue)

				found := false
				for _, n1 := range answers1 {
					for _, n2 := range answers2 {
						fmt.Println("check", joinNumbers(n1, n2))
						if joinNumbers(n1, n2) == totalValue {
							fmt.Println("found")
							found = true
							score += totalValue
							break
						}
					}
					if found {
						break
					}
				}

			}

		}

	}

	fmt.Println(score)
}

func calc(values []int, max int) []int {

	if len(values) == 1 {
		return values
	}

	val1 := values[0]
	val2 := values[1]
	result := []int{}

	if len(values) == 2 {
		result = []int{val1 + val2, val1 * val2}
	} else {
		plusResult := []int{val1 + val2}
		plusResult = append(plusResult, values[2:]...)
		multiplyResult := []int{val1 * val2}
		multiplyResult = append(multiplyResult, values[2:]...)

		result = calc(plusResult, max)
		result = append(result, calc(multiplyResult, max)...)
	}

	sanitized := []int{}
	for i := 0; i < len(result); i++ {
		if result[i] <= max {
			sanitized = append(sanitized, result[i])
		}
	}

	return sanitized
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
