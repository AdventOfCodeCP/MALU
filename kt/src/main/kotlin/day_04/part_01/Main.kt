package day4.part1

import common.readLines

fun main() {
    val result = readLines("4").map { it ->
        val (p1, p2) = it.split(",").map { Assignment(it) }
        p1.contains(p2) || p2.contains(p1)
    }.count { it }

    println(result)
}

data class Assignment(val start: Int, val end: Int) {
    constructor(str: String) : this(str.split("-")[0].toInt(), str.split("-")[1].toInt())

    fun contains(assignment: Assignment): Boolean {
        return assignment.start >= this.start && assignment.end <= this.end
    }
}
