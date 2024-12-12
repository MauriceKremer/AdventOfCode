package main

import (
	"bufio"
	"fmt"
	"os"
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

	rowNumber := 0
	var field [][]string
	for scanner.Scan() {
		line := scanner.Text()
		lineSplit := strings.Split(line, "")
		field = append(field, lineSplit)
		rowNumber += 1
	}

	count := 0
	for row := 0; row < len(field); row++ {
		for column := 0; column < len(field[row]); column++ {
			position := Position{row: row, column: column}

			if !checkChar(position, field, "X") {
				continue
			}

			for x := -1; x <= 1; x++ {
				for y := -1; y <= 1; y++ {
					direction := Direction{Y: y, X: x}
					if hasWord(direction, position, field, strings.Split("XMAS", "")) {
						// fmt.Println("found at", position.row, position.column, "direction x ", direction.X, " y ", direction.Y)
						count += 1
					}
				}
			}
		}
	}

	fmt.Println(count)

}
