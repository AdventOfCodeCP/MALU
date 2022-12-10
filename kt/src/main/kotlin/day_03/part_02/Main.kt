package day3.part2

import common.readLines

fun main() {
    val result = readLines("3").chunked(3).sumOf { it ->
        val (r1, r2, r3) = it
        val c = r1.find { r2.contains(it) && r3.contains(it) }!!
        if (c.isUpperCase()) c.code - 38 else c.code - 96
    }

    println(result)
}