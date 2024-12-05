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
			if hasX(position, field) {
				// fmt.Println("found at", position.row, position.column, "direction x ", direction.X, " y ", direction.Y)
				count += 1
			}
		}
	}

	fmt.Println(count)

}

type Position struct {
	column int
	row    int
}

func checkChar(position Position, field [][]string, toCheck string) bool {

	// out of bounds checks
	if position.column < 0 || position.column >= len(field[0]) {
		return false
	} else if position.row < 0 || position.row >= len(field) {
		return false
	}

	// check letter
	if field[position.row][position.column] != toCheck {
		return false
	}
	return true
}

func hasX(position Position, field [][]string) bool {

	// check letter
	if !checkChar(position, field, "A") {
		return false
	}

	// four positions
	position1 := Position{column: position.column - 1, row: position.row - 1}
	position2 := Position{column: position.column - 1, row: position.row + 1}
	position3 := Position{column: position.column + 1, row: position.row - 1}
	position4 := Position{column: position.column + 1, row: position.row + 1}

	if checkChar(position1, field, "M") && checkChar(position2, field, "M") && checkChar(position3, field, "S") && checkChar(position4, field, "S") {
		return true
	}
	if checkChar(position3, field, "M") && checkChar(position4, field, "M") && checkChar(position1, field, "S") && checkChar(position2, field, "S") {
		return true
	}
	if checkChar(position1, field, "M") && checkChar(position3, field, "M") && checkChar(position2, field, "S") && checkChar(position4, field, "S") {
		return true
	}
	if checkChar(position2, field, "M") && checkChar(position4, field, "M") && checkChar(position1, field, "S") && checkChar(position3, field, "S") {
		return true
	}
	return false

}
