import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useHanoiGame } from './useHanoiGame'

const sizes = (towers: { disks: { size: number }[] }[], i: number) =>
  towers[i].disks.map((d) => d.size)

describe('useHanoiGame', () => {
  it('starts with all disks on the first tower, largest at the bottom', () => {
    const { result } = renderHook(() => useHanoiGame(4))
    const { towers, moves, isComplete, selectedTower } =
      result.current.gameState
    expect(sizes(towers, 0)).toEqual([4, 3, 2, 1])
    expect(sizes(towers, 1)).toEqual([])
    expect(sizes(towers, 2)).toEqual([])
    expect(moves).toBe(0)
    expect(isComplete).toBe(false)
    expect(selectedTower).toBeNull()
  })

  it('defaults to three disks', () => {
    const { result } = renderHook(() => useHanoiGame())
    expect(result.current.gameState.towers[0].disks).toHaveLength(3)
  })

  describe('selectTower', () => {
    it('selects a tower that has disks', () => {
      const { result } = renderHook(() => useHanoiGame(3))
      act(() => result.current.selectTower(0))
      expect(result.current.gameState.selectedTower).toBe(0)
    })

    it('ignores empty towers', () => {
      const { result } = renderHook(() => useHanoiGame(3))
      act(() => result.current.selectTower(1))
      expect(result.current.gameState.selectedTower).toBeNull()
    })

    it('deselects when the same tower is clicked again', () => {
      const { result } = renderHook(() => useHanoiGame(3))
      act(() => result.current.selectTower(0))
      act(() => result.current.selectTower(0))
      expect(result.current.gameState.selectedTower).toBeNull()
      expect(result.current.gameState.moves).toBe(0)
    })

    it('moves the top disk to another tower and counts the move', () => {
      const { result } = renderHook(() => useHanoiGame(3))
      act(() => result.current.selectTower(0))
      act(() => result.current.selectTower(2))
      const { towers, moves, selectedTower } = result.current.gameState
      expect(sizes(towers, 0)).toEqual([3, 2])
      expect(sizes(towers, 2)).toEqual([1])
      expect(moves).toBe(1)
      expect(selectedTower).toBeNull()
    })

    it('rejects placing a larger disk on a smaller one without counting a move', () => {
      const { result } = renderHook(() => useHanoiGame(3))
      act(() => result.current.moveDisk(0, 2)) // disk 1 -> tower 2
      act(() => result.current.selectTower(0))
      act(() => result.current.selectTower(2)) // disk 2 onto disk 1: invalid
      const { towers, moves, selectedTower } = result.current.gameState
      expect(sizes(towers, 0)).toEqual([3, 2])
      expect(sizes(towers, 2)).toEqual([1])
      expect(moves).toBe(1)
      expect(selectedTower).toBeNull()
    })
  })

  describe('moveDisk', () => {
    it('moves a disk onto an empty tower', () => {
      const { result } = renderHook(() => useHanoiGame(3))
      act(() => result.current.moveDisk(0, 1))
      expect(sizes(result.current.gameState.towers, 1)).toEqual([1])
      expect(result.current.gameState.moves).toBe(1)
    })

    it('ignores a move from an empty tower', () => {
      const { result } = renderHook(() => useHanoiGame(3))
      const before = result.current.gameState
      act(() => result.current.moveDisk(1, 2))
      expect(result.current.gameState).toBe(before)
    })

    it('ignores an invalid move onto a smaller disk', () => {
      const { result } = renderHook(() => useHanoiGame(3))
      act(() => result.current.moveDisk(0, 1))
      act(() => result.current.moveDisk(0, 1))
      expect(sizes(result.current.gameState.towers, 1)).toEqual([1])
      expect(result.current.gameState.moves).toBe(1)
    })
  })

  it('completes in the minimum 2^n - 1 moves', () => {
    const { result } = renderHook(() => useHanoiGame(3))
    const solution = [
      [0, 2],
      [0, 1],
      [2, 1],
      [0, 2],
      [1, 0],
      [1, 2],
      [0, 2],
    ]
    for (const [from, to] of solution) {
      expect(result.current.gameState.isComplete).toBe(false)
      act(() => result.current.moveDisk(from, to))
    }
    expect(result.current.gameState.isComplete).toBe(true)
    expect(result.current.gameState.moves).toBe(7)
    expect(sizes(result.current.gameState.towers, 2)).toEqual([3, 2, 1])
  })

  it('reset restores the initial state', () => {
    const { result } = renderHook(() => useHanoiGame(3))
    act(() => result.current.moveDisk(0, 1))
    act(() => result.current.reset())
    expect(result.current.gameState.moves).toBe(0)
    expect(sizes(result.current.gameState.towers, 0)).toEqual([3, 2, 1])
  })

  it('resets when the disk count changes', () => {
    const { result, rerender } = renderHook(({ n }) => useHanoiGame(n), {
      initialProps: { n: 3 },
    })
    act(() => result.current.moveDisk(0, 1))
    rerender({ n: 5 })
    expect(result.current.gameState.moves).toBe(0)
    expect(result.current.gameState.towers[0].disks).toHaveLength(5)
  })
})
