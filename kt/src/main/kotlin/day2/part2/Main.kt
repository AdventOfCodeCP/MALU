package day2.part2

import common.read
import java.lang.IllegalArgumentException

fun main() {
    val result = read("2")
        .split("\n").sumOf {
            val elf = Options.fromString(it.split(" ")[0])

            when (it.split(" ")[1]) {
                "Y" -> elf.score + 3
                "Z" -> when (elf) {
                    Options.ROCK -> Options.PAPER.score + 6
                    Options.PAPER -> Options.SCISSORS.score + 6
                    Options.SCISSORS -> Options.ROCK.score + 6
                }

                "X" -> when (elf) {
                    Options.ROCK -> Options.SCISSORS.score
                    Options.PAPER -> Options.ROCK.score
                    Options.SCISSORS -> Options.PAPER.score
                }

                else -> throw IllegalArgumentException("Invalid strat")
            }
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
                "A" -> ROCK
                "B" -> PAPER
                "C" -> SCISSORS
                else -> throw IllegalArgumentException("Invalid option")
            }
        }
    }
}