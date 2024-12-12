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

	readRules := true
	rulesMap := make(map[int][]int)
	score := 0
	for scanner.Scan() {
		line := scanner.Text()

		if readRules {
			if line == "" {
				readRules = false
				continue
			}
			lineSplit := strings.Split(line, "|")
			key, _ := strconv.Atoi(lineSplit[0])
			value, _ := strconv.Atoi(lineSplit[1])

			appendValue(&rulesMap, key, value)
		} else {

			var values []int
			for _, s := range strings.Split(line, ",") {
				i, _ := strconv.Atoi(s)
				values = append(values, i)
			}
			result := checkRules(values, &rulesMap)
			if result == 0 {
				fmt.Println(" wrong ", values)
				values = reorder(values, rulesMap)
				fmt.Println(" reorder ", values)
				result = checkRules(values, &rulesMap)
			} else {
				result = 0
			}

			fmt.Println(result)
			score += result

		}

	}
	fmt.Println(score)

}

func checkRules(values []int, m *map[int][]int) int {

	for i, v := range values {

		if i == len(values)-1 {
			return values[(i+1)/2]
		}

		var ruleValues []int
		if rv, ok := (*m)[v]; ok {
			ruleValues = rv
		} else {
			return 0
		}

		// create a list of remainin values
		nextValues := values[i+1:]
		valid := true
		for _, n := range nextValues {
			if !contains(ruleValues, n) {
				valid = false
				break
			}
		}
		if !valid {
			return 0
		}

	}
	return 0

}

func contains(lst []int, value int) bool {
	for _, v := range lst {
		if v == value {
			return true
		}
	}
	return false
}

func appendValue(m *map[int][]int, key int, value int) {
	if _, ok := (*m)[key]; ok {
		(*m)[key] = append((*m)[key], value)
	} else {
		(*m)[key] = []int{value}
	}
}

func reorder(line []int, rules map[int][]int) []int {
	newLine := []int{}
	for _, num := range line {
		index := make(map[int]int)
		for i, n := range newLine {
			index[n] = i
		}
		newInsertIndex := len(newLine)
		for _, rule := range rules[num] {
			if idx, ok := index[rule]; ok {
				if newInsertIndex > idx {
					newInsertIndex = idx
				}
			}
		}
		afterNum := slices.Clone(newLine[newInsertIndex:])
		newLine = append(newLine[:newInsertIndex], num)
		newLine = append(newLine, afterNum...)
	}
	return newLine
}
