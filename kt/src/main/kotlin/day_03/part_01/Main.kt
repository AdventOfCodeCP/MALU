package day3.part1

import common.readLines

fun main() {
    val result = readLines("3").sumOf { it ->
        val (comp1, comp2) = it.chunked(it.length / 2)
        val c = comp1.find { comp2.contains(it) }!!
        if (c.isUpperCase()) c.code - 38 else c.code - 96
    }

    println(result)
}