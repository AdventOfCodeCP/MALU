package common

import java.io.File

fun read(day: String): String {
    return File("src/main/kotlin/day$day/input.txt").reader().readText()
}

fun readLines(day: String): List<String> {
    return File("src/main/kotlin/day$day/input.txt").reader().readLines()
}