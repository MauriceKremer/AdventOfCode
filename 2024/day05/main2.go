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

	readRules := true
	rulesMap := make(map[int][]int)
	score := 0
	var sortedRules []int
	for scanner.Scan() {
		line := scanner.Text()

		if readRules {
			if line == "" {
				readRules = false
				sortedRules = topSort(rulesMap)
				fmt.Println(sortedRules)
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
				fmt.Println(" retry", values, sortedRules, sortArray(values, sortedRules))
				result = checkRules(sortArray(values, sortedRules), &rulesMap)
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

func addAll(arr []int, m map[int]bool) {
	for _, value := range arr {
		m[value] = true
	}
}

func topSort(graph map[int][]int) []int {
	var ordering []int
	visitedKeys := make(map[int]bool)

	for key := range graph {
		var result []int
		result = dfs(graph, key, visitedKeys)
		addAll(result, visitedKeys)
		ordering = append(result, ordering...)
	}

	return ordering
}

func dfs(graph map[int][]int, positionKey int, visitedKeys map[int]bool) []int {

	fmt.Println(positionKey, visitedKeys)

	var result []int

	// if positionKey was parsed then return empty
	if _, ok := (visitedKeys)[positionKey]; ok {
		return result
	}

	// check if this has children
	if _, ok := (graph)[positionKey]; ok {

		// parse each child
		valuesInKey := graph[positionKey]

		for _, key := range valuesInKey {

			if _, ok := (visitedKeys)[key]; ok {
				continue
			}

			addAll([]int{positionKey}, visitedKeys)
			childResult := dfs(graph, key, visitedKeys)
			result = append(childResult, result...)
			addAll(result, visitedKeys)
		}
	}

	return append([]int{positionKey}, result...)
}

func sortArray(toSort []int, order []int) []int {
	var result []int
	for _, item := range order {
		for _, sortVal := range toSort {
			if sortVal == item {
				result = append(result, item)
			}
		}
	}
	return result
}
