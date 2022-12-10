package day4.part2

import common.readLines

fun main() {
    val result = readLines("4").map { it ->
        val (p1, p2) = it.split(",").map { Assignment(it) }
        p1.intersects(p2)
    }.count { it }

    println(result)
}

data class Assignment(val start: Int, val end: Int) {
    constructor(str: String) : this(str.split("-")[0].toInt(), str.split("-")[1].toInt())

    fun intersects(assignment: Assignment): Boolean {
        val list1 = (this.start until this.end + 1).toSet()
        val list2 = (assignment.start until assignment.end + 1).toSet()
        return list1.intersect(list2).isNotEmpty()
    }
}
