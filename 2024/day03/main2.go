package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func removeDisabled(line string) string {
	pattern := regexp.MustCompile(`don't\(\).+?do\(\)`)
	line = pattern.ReplaceAllString(line, "..")
	return line
}

func main() {
	readfile, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer readfile.Close()
	scanner := bufio.NewScanner(readfile)

	// stick all lines together
	fullText := ""
	for scanner.Scan() {
		line := scanner.Text()
		fullText += line
	}

	line := removeDisabled(fullText)

	pattern := regexp.MustCompile(`mul\((\d+),(\d+)\)`)
	readAll := pattern.FindAllString(line, -1)

	total := 0
	for _, subLine := range readAll {
		matcher := pattern.FindStringSubmatch(subLine)
		number1, _ := strconv.Atoi(matcher[1])
		number2, _ := strconv.Atoi(matcher[2])
		mul := number1 * number2
		total += mul
	}

	fmt.Println(total)
}
