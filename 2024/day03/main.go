package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func main() {
	readfile, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer readfile.Close()
	scanner := bufio.NewScanner(readfile)

	pattern := regexp.MustCompile(`mul\((\d+),(\d+)\)`)

	total := 0
	for scanner.Scan() {
		line := scanner.Text()

		readAll := pattern.FindAllString(line, -1)
		for _, subLine := range readAll {
			matcher := pattern.FindStringSubmatch(subLine)
			number1, _ := strconv.Atoi(matcher[1])
			number2, _ := strconv.Atoi(matcher[2])
			mul := number1 * number2
			total += mul
		}
	}
	fmt.Println(total)

}
