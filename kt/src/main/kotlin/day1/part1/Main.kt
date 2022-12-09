package day1.part1

import common.read

fun main() {
    val result = read("1")
        .split("\n\n")
        .map { it.split("\n").sumOf { line -> line.toInt() } }
        .maxOf { it }

    println(result)
}