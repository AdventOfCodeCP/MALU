package day1.part2

import common.read

fun main() {
    val result = read("1")
        .split("\n\n")
        .map { it.split("\n").sumOf { line -> line.toInt() } }
        .sorted()
        .takeLast(3)
        .sum()

    println(result)
}