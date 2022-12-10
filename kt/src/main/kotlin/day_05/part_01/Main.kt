package day5.part1

import common.read
import java.util.*

val MOVE_MATCHER = """move (\d+) from (\d+) to (\d+)""".toRegex()
fun main() {
    val (stacksInput, movesInput) = read("5").split("\n\n")
    val stacks = buildStacks(stacksInput)

    movesInput.split("\n").forEach { it ->
        val (amount, from, to) = MOVE_MATCHER.matchEntire(it)!!.groups.toList().drop(1)
            .map { Integer.valueOf(it!!.value) }
        repeat(amount) {
            val crate = stacks[from - 1].pop()
            stacks[to - 1].push(crate)
        }
    }

    val result = stacks.map {
        if (it.empty()) ""
        else it.pop()
    }

    println(result)
}

fun buildStacks(input: String): MutableList<Stack<Char>> {
    val stackColumns = input.split("\n").dropLast(1).map { it.chunked(4).map { s -> s[1] } }

    val stacks = mutableListOf<Stack<Char>>()
    repeat(stackColumns.count() + 1) {
        stacks.add(Stack<Char>())
    }

    stackColumns.reversed().forEach { chars ->
        chars.forEachIndexed { index, c ->
            if (c != ' ') stacks[index].push(c)
        }
    }

    return stacks
}