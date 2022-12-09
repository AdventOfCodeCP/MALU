package day2.part1

import common.read
import java.lang.IllegalArgumentException

fun main() {
    val result = read("2")
        .split("\n").sumOf {
            val (elf, me) = it.split(" ").map { o -> Options.fromString(o) }
            if (me === elf) {
                3 + me.score
            } else if ((me === Options.ROCK && elf === Options.SCISSORS)
                || (me === Options.PAPER && elf === Options.ROCK)
                || (me === Options.SCISSORS && elf === Options.PAPER)
            ) {
                6 + me.score
            } else me.score
        }

    println(result)
}

enum class Options(val score: Int) {
    ROCK(1),
    PAPER(2),
    SCISSORS(3);

    companion object {
        fun fromString(str: String): Options {
            return when (str) {
                "A", "X" -> ROCK
                "B", "Y" -> PAPER
                "C", "Z" -> SCISSORS
                else -> {
                    throw IllegalArgumentException("Invalid option")
                }
            }
        }
    }
}