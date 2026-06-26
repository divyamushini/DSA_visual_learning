import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Database, Layers, LayoutGrid, ArrowUp, ArrowDown, Trash2, Plus, Search, Eye,
  Play, RotateCcw, ChevronRight, ChevronDown, Circle, Square, Hexagon,
  TreeDeciduous, Network, History, Clock, RefreshCw, X, Menu, Code,
  Zap, TrendingUp, Box, List, GitBranch, Info, CheckCircle, AlertCircle, Download
} from 'lucide-react';

// Types
interface DSAOperation {
  name: string;
  action: () => void;
}

interface HistoryEntry {
  id: string;
  structureName: string;
  subtypeName: string;
  data: string;
  timestamp: Date;
}

interface DSASubtype {
  id: string;
  name: string;
  definition: string;
  principle: string;
  characteristics: string[];
  advantages: string[];
  disadvantages: string[];
  applications: string[];
  realWorldExample: string;
  timeComplexity: Record<string, string>;
  spaceComplexity: string;
}

interface DSADataStructure {
  id: string;
  name: string;
  color: string;
  gradient: string;
  icon: React.ReactNode;
  subtypes: DSASubtype[];
}

// DSA Data
const dsaStructures: DSADataStructure[] = [
  {
    id: 'primitive',
    name: 'Primitive Data Structures',
    color: 'blue',
    gradient: 'from-blue-500 to-blue-700',
    icon: <Circle className="w-6 h-6" />,
    subtypes: [
      {
        id: 'integer',
        name: 'Integer',
        definition: 'A primitive data type that represents whole numbers without fractional components.',
        principle: 'Stores numerical values as fixed-size binary representations in memory.',
        characteristics: ['Fixed size (typically 32 or 64 bits)', 'Whole numbers only', 'Signed or unsigned', 'Direct memory access'],
        advantages: ['Fast arithmetic operations', 'Memory efficient', 'Hardware optimized', 'Simple to use'],
        disadvantages: ['Limited range', 'Overflow issues', 'Cannot store decimals', 'Platform dependent sizes'],
        applications: ['Loop counters', 'Array indexing', 'Mathematical calculations', 'Flags and indicators'],
        realWorldExample: 'Counting items in inventory, tracking scores in games, array indices.',
        timeComplexity: { 'Access': 'O(1)', 'Arithmetic': 'O(1)', 'Comparison': 'O(1)' },
        spaceComplexity: 'O(1)'
      },
      {
        id: 'character',
        name: 'Character',
        definition: 'A primitive data type that represents a single symbol or letter.',
        principle: 'Stores a single character using encoding standards like ASCII or Unicode.',
        characteristics: ['Single symbol storage', 'Encoding based (ASCII/Unicode)', 'Fixed or variable size', 'Text building block'],
        advantages: ['Essential for text processing', 'Standardized encoding', 'Memory efficient', 'Easy manipulation'],
        disadvantages: ['Limited to single character', 'Encoding complexity', 'Platform variations', 'Cannot do arithmetic directly'],
        applications: ['Text processing', 'Input validation', 'String manipulation', 'Pattern matching'],
        realWorldExample: 'Storing letters in a name, validating password characters, text editors.',
        timeComplexity: { 'Access': 'O(1)', 'Comparison': 'O(1)', 'Conversion': 'O(1)' },
        spaceComplexity: 'O(1)'
      },
      {
        id: 'float',
        name: 'Float',
        definition: 'A primitive data type for representing decimal numbers with floating-point precision.',
        principle: 'Uses IEEE 754 standard to store decimal numbers with sign, exponent, and mantissa.',
        characteristics: ['Decimal support', 'IEEE 754 format', 'Scientific notation', 'Approximate values'],
        advantages: ['Handles decimals', 'Wide range of values', 'Scientific calculations', 'Standardized format'],
        disadvantages: ['Precision issues', 'Rounding errors', 'Slower than integers', 'Cannot represent all decimals exactly'],
        applications: ['Scientific computing', 'Financial calculations', 'Graphics', 'Simulations'],
        realWorldExample: 'Calculating precise measurements, representing prices, scientific formulas.',
        timeComplexity: { 'Access': 'O(1)', 'Arithmetic': 'O(1)', 'Comparison': 'O(1)' },
        spaceComplexity: 'O(1)'
      },
      {
        id: 'pointer',
        name: 'Pointer',
        definition: 'A variable that stores the memory address of another variable.',
        principle: 'Holds the location of data in memory, enabling indirect access and dynamic memory management.',
        characteristics: ['Stores memory address', 'Enables indirection', 'Dynamic allocation support', 'Reference semantics'],
        advantages: ['Dynamic memory management', 'Efficient parameter passing', 'Data structure implementation', 'Memory manipulation'],
        disadvantages: ['Memory safety risks', 'Dangling references', 'Complex debugging', 'Null pointer exceptions'],
        applications: ['Dynamic data structures', 'Memory allocation', 'Function pointers', 'Memory optimization'],
        realWorldExample: 'Linked list nodes pointing to next element, file handlers, object references.',
        timeComplexity: { 'Dereference': 'O(1)', 'Assignment': 'O(1)', 'Arithmetic': 'O(1)' },
        spaceComplexity: 'O(1)'
      }
    ]
  },
  {
    id: 'array',
    name: 'Arrays',
    color: 'purple',
    gradient: 'from-purple-500 to-purple-700',
    icon: <LayoutGrid className="w-6 h-6" />,
    subtypes: [
      {
        id: '1d-array',
        name: '1D Array',
        definition: 'A linear collection of elements stored in contiguous memory locations.',
        principle: 'Elements are indexed sequentially starting from 0, accessible via direct index calculation.',
        characteristics: ['Contiguous memory', 'Fixed size', 'Index-based access', 'Homogeneous elements'],
        advantages: ['O(1) random access', 'Memory efficient', 'Cache friendly', 'Simple implementation'],
        disadvantages: ['Fixed size', 'Insertion/deletion costly', 'Memory waste possible', 'No dynamic resizing'],
        applications: ['Storing lists', 'Buffer implementation', 'Lookup tables', 'Temporary storage'],
        realWorldExample: 'Storing student grades, shopping cart items, image pixels in a row.',
        timeComplexity: { 'Access': 'O(1)', 'Search': 'O(n)', 'Insert': 'O(n)', 'Delete': 'O(n)' },
        spaceComplexity: 'O(n)'
      },
      {
        id: '2d-array',
        name: '2D Array',
        definition: 'A matrix-like structure with rows and columns for storing data in two dimensions.',
        principle: 'Elements accessed via two indices (row, column), stored row-major or column-major.',
        characteristics: ['Row-column structure', 'Matrix representation', 'Double indexing', 'Contiguous storage'],
        advantages: ['Natural matrix representation', 'Easy element access', 'Image processing support', 'Tabular data'],
        disadvantages: ['Fixed dimensions', 'Memory overhead', 'Complex resizing', 'Cache issues in column-major'],
        applications: ['Image processing', 'Game boards', 'Spreadsheets', 'Graphs adjacency matrix'],
        realWorldExample: 'Chess board, screen pixels, spreadsheet data, battleship game grid.',
        timeComplexity: { 'Access': 'O(1)', 'Search': 'O(mn)', 'Insert': 'O(mn)', 'Delete': 'O(mn)' },
        spaceComplexity: 'O(mn)'
      },
      {
        id: 'multi-array',
        name: 'Multi-Dimensional Array',
        definition: 'Array with more than two dimensions for representing complex multi-faceted data.',
        principle: 'Extended indexing system with multiple subscripts for each dimension.',
        characteristics: ['N dimensions', 'Complex indexing', 'Large memory footprint', 'Specialized access patterns'],
        advantages: ['Natural data modeling', 'Multi-faceted data', 'Scientific computing', '3D+ representation'],
        disadvantages: ['Memory intensive', 'Complex indexing', 'Hard to visualize', 'Performance overhead'],
        applications: ['3D graphics', 'Scientific simulations', 'Video data', 'Multi-dimensional data'],
        realWorldExample: '3D game world coordinates, video frames (x,y,time), MRI scan data.',
        timeComplexity: { 'Access': 'O(1)', 'Search': 'O(n^d)', 'Insert': 'O(n^d)', 'Delete': 'O(n^d)' },
        spaceComplexity: 'O(n^d)'
      }
    ]
  },
  {
    id: 'stack',
    name: 'Stack',
    color: 'orange',
    gradient: 'from-orange-500 to-orange-700',
    icon: <Layers className="w-6 h-6" />,
    subtypes: [
      {
        id: 'simple-stack',
        name: 'Simple Stack',
        definition: 'A LIFO (Last In First Out) data structure with fixed size implementation.',
        principle: 'Elements added and removed from same end (top), maintaining strict LIFO order.',
        characteristics: ['LIFO principle', 'Single entry/exit point', 'Fixed capacity', 'Top pointer'],
        advantages: ['Simple implementation', 'O(1) operations', 'Memory efficient', 'No overflow checks needed'],
        disadvantages: ['Fixed size limitation', 'Overflow risk', 'Underflow risk', 'No random access'],
        applications: ['Function calls', 'Undo operations', 'Expression evaluation', 'Backtracking'],
        realWorldExample: 'Stack of plates, browser back button, function call stack.',
        timeComplexity: { 'Push': 'O(1)', 'Pop': 'O(1)', 'Peek': 'O(1)', 'Search': 'O(n)' },
        spaceComplexity: 'O(n)'
      },
      {
        id: 'dynamic-stack',
        name: 'Dynamic Stack',
        definition: 'A stack that automatically resizes when capacity is reached.',
        principle: 'Uses dynamic array underneath, doubling size when full and halving when sparse.',
        characteristics: ['Auto-resizing', 'Flexible capacity', 'LIFO principle', 'Growth factor'],
        advantages: ['No fixed limit', 'Efficient resizing', 'Easier to use', 'Memory adaptable'],
        disadvantages: ['Amortized cost', 'Memory fragmentation', 'Resizing overhead', 'Non-uniform performance'],
        applications: ['Dynamic function calls', 'Expression parsing', 'Memory management', 'Algorithm implementation'],
        realWorldExample: 'Browser history with unlimited depth, dynamic undo stack in editors.',
        timeComplexity: { 'Push': 'O(1) amortized', 'Pop': 'O(1)', 'Peek': 'O(1)', 'Search': 'O(n)' },
        spaceComplexity: 'O(n)'
      },
      {
        id: 'circular-stack',
        name: 'Circular Stack',
        definition: 'A fixed-size stack that overwrites oldest elements when full.',
        principle: 'Uses circular buffer pattern where top pointer wraps around.',
        characteristics: ['Circular buffer', 'Overwrite behavior', 'Fixed memory', 'Continuous operation'],
        advantages: ['Never overflows', 'Constant memory', 'Predictable behavior', 'Continuous operation'],
        disadvantages: ['Data loss on overflow', 'Fixed capacity', 'Complex logic', 'No size indication'],
        applications: ['Circular logging', 'Event history', 'Rolling buffers', 'Stream processing'],
        realWorldExample: 'Last N undo operations, circular log buffer, recent call history.',
        timeComplexity: { 'Push': 'O(1)', 'Pop': 'O(1)', 'Peek': 'O(1)', 'Search': 'O(n)' },
        spaceComplexity: 'O(n)'
      }
    ]
  },
  {
    id: 'queue',
    name: 'Queue',
    color: 'green',
    gradient: 'from-green-500 to-green-700',
    icon: <ArrowUp className="w-6 h-6 rotate-90" />,
    subtypes: [
      {
        id: 'simple-queue',
        name: 'Simple Queue',
        definition: 'A FIFO (First In First Out) data structure with linear implementation.',
        principle: 'Elements added at rear and removed from front, maintaining strict FIFO order.',
        characteristics: ['FIFO principle', 'Two endpoints', 'Linear structure', 'Sequential access'],
        advantages: ['Fair ordering', 'Simple concept', 'Natural buffering', 'Order preservation'],
        disadvantages: ['Fixed size', 'Overflow/underflow', 'Empty slots wasted', 'No priority'],
        applications: ['Print spooling', 'Task scheduling', 'Message queues', 'Breadth-first search'],
        realWorldExample: 'Queue at ticket counter, printer job queue, process scheduling.',
        timeComplexity: { 'Enqueue': 'O(1)', 'Dequeue': 'O(1)', 'Front': 'O(1)', 'Rear': 'O(1)' },
        spaceComplexity: 'O(n)'
      },
      {
        id: 'circular-queue',
        name: 'Circular Queue',
        definition: 'A queue implemented as a circular buffer for efficient space utilization.',
        principle: 'Front and rear pointers wrap around, reusing empty slots.',
        characteristics: ['Circular buffer', 'Space efficient', 'Wrap-around pointers', 'Fixed capacity'],
        advantages: ['No wasted space', 'Efficient memory use', 'Continuous operation', 'No shifting needed'],
        disadvantages: ['Fixed capacity', 'Complex logic', 'Full/empty detection', 'Pointer management'],
        applications: ['CPU scheduling', 'Memory management', 'Data streaming', 'Traffic control'],
        realWorldExample: 'Round-robin scheduling, circular data buffer, highway traffic merging.',
        timeComplexity: { 'Enqueue': 'O(1)', 'Dequeue': 'O(1)', 'Front': 'O(1)', 'Rear': 'O(1)' },
        spaceComplexity: 'O(n)'
      },
      {
        id: 'priority-queue',
        name: 'Priority Queue',
        definition: 'A queue where elements are served based on priority rather than arrival order.',
        principle: 'Uses heap structure to always extract highest/lowest priority element.',
        characteristics: ['Priority-based', 'Heap implementation', 'Ordered extraction', 'Dynamic ordering'],
        advantages: ['Priority handling', 'Efficient extraction', 'Flexible priorities', 'Optimal scheduling'],
        disadvantages: ['Complex implementation', 'Insertion overhead', 'No FIFO guarantee', 'Memory overhead'],
        applications: ['CPU scheduling', 'Dijkstra algorithm', 'Event simulation', 'Task management'],
        realWorldExample: 'Emergency room triage, VIP customers, operating system process scheduling.',
        timeComplexity: { 'Insert': 'O(log n)', 'Extract': 'O(log n)', 'Peek': 'O(1)', 'Update': 'O(log n)' },
        spaceComplexity: 'O(n)'
      },
      {
        id: 'deque',
        name: 'Deque',
        definition: 'Double-ended queue allowing insertion and deletion at both ends.',
        principle: 'Maintains two pointers for front and rear with operations on both sides.',
        characteristics: ['Double ended', 'Flexible operations', 'Hybrid of stack and queue', 'Two pointers'],
        advantages: ['Versatile operations', 'Both LIFO and FIFO', 'Efficient ends', 'Flexible access'],
        disadvantages: ['Complex implementation', 'More memory', 'Pointer overhead', 'Cache issues'],
        applications: ['Sliding window problems', 'Palindrome checking', 'Undo-redo', 'Browser history'],
        realWorldExample: 'Browser forward/back buttons, deck of cards (draw from top/bottom).',
        timeComplexity: { 'Add Front': 'O(1)', 'Add Rear': 'O(1)', 'Delete Front': 'O(1)', 'Delete Rear': 'O(1)' },
        spaceComplexity: 'O(n)'
      }
    ]
  },
  {
    id: 'linkedlist',
    name: 'Linked List',
    color: 'teal',
    gradient: 'from-teal-500 to-teal-700',
    icon: <List className="w-6 h-6" />,
    subtypes: [
      {
        id: 'singly-linked',
        name: 'Singly Linked List',
        definition: 'A linear data structure where each node points to the next node.',
        principle: 'Nodes contain data and a pointer to next node, forming a chain.',
        characteristics: ['Single direction', 'Dynamic size', 'Node based', 'Sequential access'],
        advantages: ['Dynamic size', 'Easy insertion/deletion', 'Memory efficient', 'No wasted space'],
        disadvantages: ['No random access', 'No backward traversal', 'Extra pointer space', 'Cache unfriendly'],
        applications: ['Dynamic memory allocation', 'Playlist management', 'Undo functionality', 'Hash table chaining'],
        realWorldExample: 'Music playlist (next song), browser tabs, train cars linked together.',
        timeComplexity: { 'Access': 'O(n)', 'Search': 'O(n)', 'Insert': 'O(1)', 'Delete': 'O(1)' },
        spaceComplexity: 'O(n)'
      },
      {
        id: 'doubly-linked',
        name: 'Doubly Linked List',
        definition: 'A linked list where each node has pointers to both next and previous nodes.',
        principle: 'Nodes contain data and two pointers enabling bidirectional traversal.',
        characteristics: ['Bidirectional', 'Two pointers', 'Flexible traversal', 'More memory'],
        advantages: ['Bidirectional traversal', 'Easier deletion', 'More flexible', 'Better navigation'],
        disadvantages: ['Extra memory for pointers', 'Complex implementation', 'More operations', 'Update overhead'],
        applications: ['Browser history', 'LRU cache', 'Undo-redo systems', 'Text editors'],
        realWorldExample: 'Browser forward/back navigation, doubly linked list in OS for process management.',
        timeComplexity: { 'Access': 'O(n)', 'Search': 'O(n)', 'Insert': 'O(1)', 'Delete': 'O(1)' },
        spaceComplexity: 'O(n)'
      },
      {
        id: 'circular-linked',
        name: 'Circular Linked List',
        definition: 'A linked list where the last node points back to the first node.',
        principle: 'Forms a closed loop, eliminating NULL at the end.',
        characteristics: ['Circular connection', 'No end pointer', 'Continuous cycle', 'Any node as start'],
        advantages: ['No NULL checks', 'Circular operations', 'Continuous traversal', 'Round-robin support'],
        disadvantages: ['Infinite loops risk', 'End detection hard', 'Complex debugging', 'Extra care needed'],
        applications: ['Round-robin scheduling', 'Circular playlists', 'Multiplayer games', 'CPU scheduling'],
        realWorldExample: 'Music playlist on repeat, round-robin task scheduling, carnival ride queue.',
        timeComplexity: { 'Access': 'O(n)', 'Search': 'O(n)', 'Insert': 'O(1)', 'Delete': 'O(1)' },
        spaceComplexity: 'O(n)'
      },
      {
        id: 'circular-doubly-linked',
        name: 'Circular Doubly Linked List',
        definition: 'Combines circular and doubly linked features for maximum flexibility.',
        principle: 'Each node has two pointers, and the list forms a complete circle.',
        characteristics: ['Bidirectional circular', 'Two pointers', 'Maximum flexibility', 'No NULL'],
        advantages: ['Most flexible', 'Easy navigation', 'No NULL checks', 'Efficient operations'],
        disadvantages: ['Memory overhead', 'Complex implementation', 'More edge cases', 'Update overhead'],
        applications: ['Text editors cursor', 'Image viewers', 'Complex playlists', 'Memory management'],
        realWorldExample: 'Advanced music player with next/prev and repeat, image carousel viewer.',
        timeComplexity: { 'Access': 'O(n)', 'Search': 'O(n)', 'Insert': 'O(1)', 'Delete': 'O(1)' },
        spaceComplexity: 'O(n)'
      }
    ]
  },
  {
    id: 'tree',
    name: 'Tree',
    color: 'red',
    gradient: 'from-red-500 to-red-700',
    icon: <TreeDeciduous className="w-6 h-6" />,
    subtypes: [
      {
        id: 'binary-tree',
        name: 'Binary Tree',
        definition: 'A hierarchical structure where each node has at most two children.',
        principle: 'Organizes data in parent-child relationships with left and right subtrees.',
        characteristics: ['At most 2 children', 'Hierarchical', 'Root-leaf structure', 'Recursive nature'],
        advantages: ['Efficient searching', 'Hierarchical representation', 'Natural recursion', 'Sorted data'],
        disadvantages: ['Can become unbalanced', 'Memory for pointers', 'Complex operations', 'Pointer overhead'],
        applications: ['Expression trees', 'Decision trees', 'File systems', 'DOM structure'],
        realWorldExample: 'File system hierarchy, organization chart, HTML DOM structure.',
        timeComplexity: { 'Insert': 'O(n)', 'Search': 'O(n)', 'Delete': 'O(n)', 'Traverse': 'O(n)' },
        spaceComplexity: 'O(n)'
      },
      {
        id: 'bst',
        name: 'Binary Search Tree (BST)',
        definition: 'A binary tree where left child < parent < right child.',
        principle: 'Maintains sorted order for efficient searching, insertion, and deletion.',
        characteristics: ['Ordered structure', 'Left < Root < Right', 'Efficient search', 'Dynamic sorting'],
        advantages: ['O(log n) average search', 'Dynamic operations', 'Maintains order', 'In-order sorted'],
        disadvantages: ['Can degrade to O(n)', 'Balancing needed', 'Complex deletion', 'No duplicate handling'],
        applications: ['Database indexing', 'Symbol tables', 'Key-value stores', 'Sort algorithms'],
        realWorldExample: 'Dictionary lookup, phone book, auto-complete suggestions.',
        timeComplexity: { 'Insert': 'O(log n) avg', 'Search': 'O(log n) avg', 'Delete': 'O(log n) avg', 'Traverse': 'O(n)' },
        spaceComplexity: 'O(n)'
      },
      {
        id: 'avl',
        name: 'AVL Tree',
        definition: 'A self-balancing BST where height difference between subtrees is at most 1.',
        principle: 'Uses rotations to maintain balance after every operation.',
        characteristics: ['Self-balancing', 'Height difference <= 1', 'Rotations', 'Guaranteed balance'],
        advantages: ['Guaranteed O(log n)', 'Always balanced', 'Predictable performance', 'Efficient operations'],
        disadvantages: ['Complex rotations', 'Extra balance factor', 'Insertion overhead', 'More storage'],
        applications: ['Database systems', 'File systems', 'Memory allocation', 'Symbol tables'],
        realWorldExample: 'Database query optimization, file system metadata, memory management.',
        timeComplexity: { 'Insert': 'O(log n)', 'Search': 'O(log n)', 'Delete': 'O(log n)', 'Rotate': 'O(1)' },
        spaceComplexity: 'O(n)'
      },
      {
        id: 'heap',
        name: 'Heap',
        definition: 'A complete binary tree satisfying the heap property (max or min).',
        principle: 'Parent is always greater (max-heap) or smaller (min-heap) than children.',
        characteristics: ['Complete binary tree', 'Heap property', 'Array representation', 'Priority based'],
        advantages: ['O(1) peek', 'O(log n) insert/delete', 'Array storage', 'Priority queue'],
        disadvantages: ['No efficient search', 'Not sorted', 'Fixed priority', 'Complex building'],
        applications: ['Priority queues', 'Heap sort', 'Graph algorithms', 'Scheduling'],
        realWorldExample: 'Task priority scheduling, heap sort algorithm, finding k-th largest.',
        timeComplexity: { 'Insert': 'O(log n)', 'Extract': 'O(log n)', 'Peek': 'O(1)', 'Build': 'O(n)' },
        spaceComplexity: 'O(n)'
      },
      {
        id: 'b-tree',
        name: 'B Tree',
        definition: 'A self-balancing tree with multiple keys per node for disk storage.',
        principle: 'Nodes can have multiple children and keys, keeping height minimal.',
        characteristics: ['Multiple keys per node', 'Balanced', 'Fixed node size', 'Disk-optimized'],
        advantages: ['Fewer disk access', 'Balanced growth', 'Sequential access', 'Range queries'],
        disadvantages: ['Complex implementation', 'Memory overhead', 'Node splitting', 'Variable keys'],
        applications: ['Databases', 'File systems', 'Storage systems', 'Indexing'],
        realWorldExample: 'Database indexing, file system directories, external storage.',
        timeComplexity: { 'Insert': 'O(log n)', 'Search': 'O(log n)', 'Delete': 'O(log n)', 'Range': 'O(k + log n)' },
        spaceComplexity: 'O(n)'
      },
      {
        id: 'bplus-tree',
        name: 'B+ Tree',
        definition: 'A B-tree variant where data is only in leaves, connected in a linked list.',
        principle: 'Internal nodes store only keys, leaves store data and are linked.',
        characteristics: ['Data in leaves only', 'Linked leaves', 'Dense index', 'Efficient range queries'],
        advantages: ['Better range queries', 'Linked leaves', 'Consistent access', 'More keys per node'],
        disadvantages: ['Extra pointer storage', 'More levels potentially', 'Complex implementation', 'Overhead'],
        applications: ['Database indexes', 'File systems', 'Key-value stores', 'Range queries'],
        realWorldExample: 'Database primary keys, file system metadata, range query optimization.',
        timeComplexity: { 'Insert': 'O(log n)', 'Search': 'O(log n)', 'Delete': 'O(log n)', 'Range': 'O(k + log n)' },
        spaceComplexity: 'O(n)'
      }
    ]
  },
  {
    id: 'graph',
    name: 'Graph',
    color: 'cyan',
    gradient: 'from-cyan-500 to-cyan-700',
    icon: <Network className="w-6 h-6" />,
    subtypes: [
      {
        id: 'directed-graph',
        name: 'Directed Graph',
        definition: 'A graph where edges have direction, indicating one-way relationships.',
        principle: 'Edges are ordered pairs (u, v) indicating direction from u to v.',
        characteristics: ['Directed edges', 'One-way relationships', 'In-degree/out-degree', 'Arrows'],
        advantages: ['Models dependencies', 'One-way flow', 'Represent processes', 'Follow relationships'],
        disadvantages: ['Harder to traverse', 'Connectivity complex', 'No symmetry', 'More edges needed'],
        applications: ['Social networks following', 'Web links', 'Dependencies', 'State machines'],
        realWorldExample: 'Twitter following system, website links, task dependencies.',
        timeComplexity: { 'Add Edge': 'O(1)', 'Remove Edge': 'O(1)', 'BFS': 'O(V+E)', 'DFS': 'O(V+E)' },
        spaceComplexity: 'O(V + E)'
      },
      {
        id: 'undirected-graph',
        name: 'Undirected Graph',
        definition: 'A graph where edges have no direction, indicating bidirectional relationships.',
        principle: 'Edges are unordered pairs {u, v} representing bidirectional connection.',
        characteristics: ['Bidirectional edges', 'Symmetric relationships', 'Degrees only', 'No arrows'],
        advantages: ['Simple representation', 'Symmetric operations', 'Easy traversal', 'Natural connections'],
        disadvantages: ['Cannot model one-way', 'Extra edges stored', 'Less expressive', 'No direction info'],
        applications: ['Social networks friends', 'Road networks', 'Networks', 'Map connections'],
        realWorldExample: 'Facebook friendships, road networks, computer networks.',
        timeComplexity: { 'Add Edge': 'O(1)', 'Remove Edge': 'O(1)', 'BFS': 'O(V+E)', 'DFS': 'O(V+E)' },
        spaceComplexity: 'O(V + E)'
      },
      {
        id: 'weighted-graph',
        name: 'Weighted Graph',
        definition: 'A graph where edges have weights representing cost, distance, or capacity.',
        principle: 'Each edge has an associated numerical value (weight).',
        characteristics: ['Edge weights', 'Cost representation', 'Optimization problems', 'Real values'],
        advantages: ['Model real costs', 'Shortest path', 'Network flow', 'Resource allocation'],
        disadvantages: ['Complex algorithms', 'Weight handling', 'Negative weight issues', 'More storage'],
        applications: ['GPS navigation', 'Network routing', 'Airline routes', 'Resource optimization'],
        realWorldExample: 'Google Maps distances, airline networks, network bandwidth.',
        timeComplexity: { 'Add Edge': 'O(1)', 'Shortest Path': 'O((V+E) log V)', 'MST': 'O(E log V)', 'BFS': 'O(V+E)' },
        spaceComplexity: 'O(V + E)'
      },
      {
        id: 'unweighted-graph',
        name: 'Unweighted Graph',
        definition: 'A graph where all edges are equal, with no associated weight.',
        principle: 'Edges only indicate presence of connection, not magnitude.',
        characteristics: ['Equal edges', 'Connection only', 'Simpler algorithms', 'Binary relationships'],
        advantages: ['Simpler implementation', 'Faster operations', 'Clear connectivity', 'Less storage'],
        disadvantages: ['No cost modeling', 'Less information', 'Limited applications', 'No optimization'],
        applications: ['Social connections', 'Reachability', 'Connectivity problems', 'Matching'],
        realWorldExample: 'Social network connections, circuit connectivity, graph coloring.',
        timeComplexity: { 'Add Edge': 'O(1)', 'Remove Edge': 'O(1)', 'BFS': 'O(V+E)', 'DFS': 'O(V+E)' },
        spaceComplexity: 'O(V + E)'
      },
      {
        id: 'cyclic-graph',
        name: 'Cyclic Graph',
        definition: 'A graph containing at least one cycle (path from node back to itself).',
        principle: 'Has closed loops where starting and ending nodes are the same.',
        characteristics: ['Contains cycles', 'Circular paths', 'Feedback loops', 'Self-reference'],
        advantages: ['Model dependencies', 'Circular references', 'Feedback systems', 'Real processes'],
        disadvantages: ['Infinite loops risk', 'Complex traversal', 'Deadlock potential', 'Need cycle detection'],
        applications: ['Circular dependencies', 'Feedback systems', 'Deadlock detection', 'Circular references'],
        realWorldExample: 'Circular import dependencies, circular references in memory, ecological cycles.',
        timeComplexity: { 'Add Edge': 'O(1)', 'Cycle Detection': 'O(V+E)', 'BFS': 'O(V+E)', 'DFS': 'O(V+E)' },
        spaceComplexity: 'O(V + E)'
      },
      {
        id: 'acyclic-graph',
        name: 'Acyclic Graph',
        definition: 'A graph with no cycles, meaning no path from a node back to itself.',
        principle: 'Has no closed loops; can represent hierarchical dependencies.',
        characteristics: ['No cycles', 'DAG if directed', 'Hierarchy representation', 'Topological order'],
        advantages: ['Topological sort', 'Dependency resolution', 'No infinite loops', 'Hierarchical structure'],
        disadvantages: ['Restricted connectivity', 'Cannot model cycles', 'Limited expressiveness', 'Special case'],
        applications: ['Build systems', 'Task scheduling', 'Dependencies', 'Version control'],
        realWorldExample: 'Package dependencies, build order, course prerequisites, Git commit history.',
        timeComplexity: { 'Add Edge': 'O(1)', 'Topological Sort': 'O(V+E)', 'DFS': 'O(V+E)', 'Longest Path': 'O(V+E)' },
        spaceComplexity: 'O(V + E)'
      }
    ]
  }
];

// Color theme constants
const colorThemes = {
  primitive: { bg: 'bg-blue-500', gradient: 'from-blue-500 to-blue-700', text: 'text-blue-400', border: 'border-blue-500', light: 'bg-blue-500/10' },
  array: { bg: 'bg-purple-500', gradient: 'from-purple-500 to-purple-700', text: 'text-purple-400', border: 'border-purple-500', light: 'bg-purple-500/10' },
  stack: { bg: 'bg-orange-500', gradient: 'from-orange-500 to-orange-700', text: 'text-orange-400', border: 'border-orange-500', light: 'bg-orange-500/10' },
  queue: { bg: 'bg-green-500', gradient: 'from-green-500 to-green-700', text: 'text-green-400', border: 'border-green-500', light: 'bg-green-500/10' },
  linkedlist: { bg: 'bg-teal-500', gradient: 'from-teal-500 to-teal-700', text: 'text-teal-400', border: 'border-teal-500', light: 'bg-teal-500/10' },
  tree: { bg: 'bg-red-500', gradient: 'from-red-500 to-red-700', text: 'text-red-400', border: 'border-red-500', light: 'bg-red-500/10' },
  graph: { bg: 'bg-cyan-500', gradient: 'from-cyan-500 to-cyan-700', text: 'text-cyan-400', border: 'border-cyan-500', light: 'bg-cyan-500/10' },
  history: { bg: 'bg-yellow-500', gradient: 'from-yellow-500 to-yellow-700', text: 'text-yellow-400', border: 'border-yellow-500', light: 'bg-yellow-500/10' }
};

function getColorTheme(id: string) {
  return colorThemes[id as keyof typeof colorThemes] || colorThemes.primitive;
}

// Main App Component
function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedStructure, setSelectedStructure] = useState<DSADataStructure | null>(null);
  const [selectedSubtype, setSelectedSubtype] = useState<DSASubtype | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedFlowchart, setExpandedFlowchart] = useState(true);

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dsa-history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistory(parsed.map((h: HistoryEntry) => ({ ...h, timestamp: new Date(h.timestamp) })));
      } catch (e) {
        console.error('Failed to load history:', e);
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('dsa-history', JSON.stringify(history));
  }, [history]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Database className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                DSA Visual Hub
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <NavLink onClick={() => scrollToSection('home')}>Home</NavLink>
              <NavLink onClick={() => scrollToSection('flowchart')}>Flowchart</NavLink>
              <NavLink onClick={() => scrollToSection('structures')}>Structures</NavLink>
              <NavLink onClick={() => scrollToSection('simulators')}>Simulators</NavLink>
              <NavLink onClick={() => scrollToSection('complexity')}>Complexity</NavLink>
              <NavLink onClick={() => scrollToSection('history')}>History</NavLink>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-slate-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden backdrop-blur-xl bg-slate-900/95 border-t border-slate-700">
            <div className="px-4 py-2 space-y-1">
              <MobileNavLink onClick={() => scrollToSection('home')}>Home</MobileNavLink>
              <MobileNavLink onClick={() => scrollToSection('flowchart')}>Flowchart</MobileNavLink>
              <MobileNavLink onClick={() => scrollToSection('structures')}>Structures</MobileNavLink>
              <MobileNavLink onClick={() => scrollToSection('simulators')}>Simulators</MobileNavLink>
              <MobileNavLink onClick={() => scrollToSection('complexity')}>Complexity</MobileNavLink>
              <MobileNavLink onClick={() => scrollToSection('history')}>History</MobileNavLink>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700 p-8 md:p-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }} />
            </div>

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-6">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-blue-300">Interactive Learning Platform</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  DSA Visual
                </span>
                <br />
                <span className="text-white">Learning Hub</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                Master Data Structures and Algorithms through interactive visualizations, real-time simulations, and comprehensive explanations.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => scrollToSection('flowchart')}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
                >
                  Explore Flowchart
                </button>
                <button
                  onClick={() => scrollToSection('simulators')}
                  className="px-8 py-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white font-semibold hover:bg-slate-700 transition-all duration-300"
                >
                  Try Simulators
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                <StatCard number="6" label="Categories" />
                <StatCard number="24" label="Subtypes" />
                <StatCard number="50+" label="Operations" />
                <StatCard number="100%" label="Interactive" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DSA Flowchart Section */}
      <section id="flowchart" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="DSA Classification Flowchart"
            subtitle="Interactive visualization of the complete Data Structure hierarchy"
            icon={<GitBranch className="w-6 h-6" />}
          />

          <div className="backdrop-blur-xl bg-slate-800/30 border border-slate-700 rounded-2xl p-6 md:p-8">
            {/* Root Level */}
            <div className="flex flex-col items-center">
              <FlowchartNode
                label="Data Structures"
                level="root"
                expanded={expandedFlowchart}
                onToggle={() => setExpandedFlowchart(!expandedFlowchart)}
              />

              {expandedFlowchart && (
                <>
                  {/* Primitive vs Non-Primitive */}
                  <div className="flex items-center my-4">
                    <div className="h-0.5 bg-gradient-to-r from-blue-500 to-transparent flex-1 w-16" />
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <div className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400">
                      Classification
                    </div>
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <div className="h-0.5 bg-gradient-to-l from-blue-500 to-transparent flex-1 w-16" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                    {/* Primitive */}
                    <div className="flex flex-col items-center">
                      <FlowchartNode label="Primitive" level="primitive" />
                      <div className="h-6 border-l-2 border-blue-500" />
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {['Integer', 'Character', 'Float', 'Pointer'].map((item) => (
                          <FlowchartNode key={item} label={item} level="sub-primitive" />
                        ))}
                      </div>
                    </div>

                    {/* Non-Primitive */}
                    <div className="flex flex-col items-center">
                      <FlowchartNode label="Non-Primitive" level="non-primitive" />
                      <div className="h-6 border-l-2 border-purple-500" />
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {['Arrays', 'Stack', 'Queue', 'Linked List', 'Tree', 'Graph'].map((item, idx) => {
                          const colors = ['purple', 'orange', 'green', 'teal', 'red', 'cyan'];
                          return (
                            <FlowchartNode key={item} label={item} level={`sub-${colors[idx]}`} />
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="w-full mt-12 space-y-8">
                    {dsaStructures.map((structure) => (
                      <StructureFlowchart
                        key={structure.id}
                        structure={structure}
                        onSelect={() => {
                          setSelectedStructure(structure);
                          scrollToSection('structures');
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Structures Section */}
      <section id="structures" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Data Structures"
            subtitle="Comprehensive guide to every data structure and subtype"
            icon={<Database className="w-6 h-6" />}
          />

          {/* Structure Type Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {dsaStructures.map((structure) => {
              const theme = getColorTheme(structure.id);
              const isActive = selectedStructure?.id === structure.id;
              return (
                <button
                  key={structure.id}
                  onClick={() => setSelectedStructure(isActive ? null : structure)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${theme.gradient} text-white shadow-lg`
                      : `bg-slate-700/50 hover:bg-slate-700 text-slate-300`
                  }`}
                >
                  {structure.name}
                </button>
              );
            })}
          </div>

          {/* Structure Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dsaStructures.map((structure) => (
              <StructureCard
                key={structure.id}
                structure={structure}
                isExpanded={selectedStructure?.id === structure.id}
                onToggle={() => setSelectedStructure(selectedStructure?.id === structure.id ? null : structure)}
                onSelectSubtype={setSelectedSubtype}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Simulators Section */}
      <section id="simulators" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Interactive Simulators"
            subtitle="Hands-on practice with every data structure operation"
            icon={<Play className="w-6 h-6" />}
          />

          {/* Structure Selection for Simulator */}
          <SimulatorSection
            structures={dsaStructures}
            history={history}
            onAddHistory={(entry) => setHistory(prev => [entry, ...prev.slice(0, 99)])}
            onRestoreHistory={(entry) => setHistory(prev => [entry, ...prev.slice(0, 99)])}
          />
        </div>
      </section>

      {/* Complexity Comparison Section */}
      <section id="complexity" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Complexity Comparison"
            subtitle="Time and Space complexity analysis for all operations"
            icon={<TrendingUp className="w-6 h-6" />}
          />

          <div className="backdrop-blur-xl bg-slate-800/30 border border-slate-700 rounded-2xl overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Structure</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Subtype</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Operations</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Time Complexity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Space Complexity</th>
                </tr>
              </thead>
              <tbody>
                {dsaStructures.flatMap((structure) =>
                  structure.subtypes.map((subtype, idx) => (
                    <tr key={subtype.id} className={`${idx !== structure.subtypes.length - 1 ? 'border-b border-slate-700/50' : ''} hover:bg-slate-700/30 transition-colors`}>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r ${getColorTheme(structure.id).gradient} text-white text-sm`}>
                          {structure.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{subtype.name}</td>
                      <td className="px-6 py-4 text-slate-300">
                        <div className="flex flex-wrap gap-1">
                          {Object.keys(subtype.timeComplexity).map((op) => (
                            <span key={op} className="px-2 py-0.5 rounded bg-slate-700 text-xs">
                              {op}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(subtype.timeComplexity).map(([op, complexity]) => (
                            <span key={op} className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs">
                              {op}: {complexity}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-xs">
                          {subtype.spaceComplexity}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section id="history" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Cleared Data History"
            subtitle="Track and restore your cleared simulation data"
            icon={<History className="w-6 h-6" />}
            theme={colorThemes.history}
          />

          <div className="backdrop-blur-xl bg-slate-800/30 border border-slate-700 rounded-2xl p-6">
            {history.length === 0 ? (
              <div className="text-center py-12">
                <History className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-500">No history yet. Clear some simulation data to see it here.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-400 text-sm">{history.length} entries</span>
                  <button
                    onClick={() => setHistory([])}
                    className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm transition-colors"
                  >
                    Clear All History
                  </button>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {history.map((entry) => (
                    <HistoryEntryCard
                      key={entry.id}
                      entry={entry}
                      onRestore={(restoredEntry) => setHistory(prev => [...prev, restoredEntry])}
                      onDelete={() => setHistory(prev => prev.filter(e => e.id !== entry.id))}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-sm">DSA Visual Learning Hub - Built for Learning</p>
        </div>
      </footer>
    </div>
  );
}

// Component: Navigation Link
function NavLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
    >
      {children}
    </button>
  );
}

function MobileNavLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-3 rounded-lg text-left text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
    >
      {children}
    </button>
  );
}

// Component: Stat Card
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center p-4 rounded-xl bg-slate-800/50 border border-slate-700">
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        {number}
      </div>
      <div className="text-sm text-slate-400 mt-1">{label}</div>
    </div>
  );
}

// Component: Section Header
function SectionHeader({ title, subtitle, icon, theme }: { title: string; subtitle: string; icon: React.ReactNode; theme?: typeof colorThemes.primitive }) {
  return (
    <div className="text-center mb-12">
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme?.light || 'bg-purple-500/10'} border ${theme?.border || 'border-purple-500/30'} mb-4`}>
        <span className={theme?.text || 'text-purple-400'}>{icon}</span>
        <span className={`text-sm font-medium ${theme?.text || 'text-purple-300'}`}>{title}</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
      <p className="text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
}

// Component: Flowchart Node
function FlowchartNode({
  label,
  level,
  expanded,
  onToggle
}: {
  label: string;
  level: string;
  expanded?: boolean;
  onToggle?: () => void;
}) {
  const levelStyles: Record<string, string> = {
    root: 'h-auto px-8 py-4 text-lg font-semibold',
    primitive: 'bg-blue-500 border-blue-300 text-white',
    'non-primitive': 'bg-purple-500 border-purple-300 text-white',
    'sub-primitive': 'bg-blue-500/30 border-blue-500/50 text-blue-300 text-sm px-3 py-1.5',
    'sub-purple': 'bg-purple-500/30 border-purple-500/50 text-purple-300 text-sm px-3 py-1.5',
    'sub-orange': 'bg-orange-500/30 border-orange-500/50 text-orange-300 text-sm px-3 py-1.5',
    'sub-green': 'bg-green-500/30 border-green-500/50 text-green-300 text-sm px-3 py-1.5',
    'sub-teal': 'bg-teal-500/30 border-teal-500/50 text-teal-300 text-sm px-3 py-1.5',
    'sub-red': 'bg-red-500/30 border-red-500/50 text-red-300 text-sm px-3 py-1.5',
    'sub-cyan': 'bg-cyan-500/30 border-cyan-500/50 text-cyan-300 text-sm px-3 py-1.5',
  };

  return (
    <button
      onClick={onToggle}
      className={`${levelStyles[level] || levelStyles['sub-primitive']} rounded-xl border transition-all duration-200 hover:scale-105 ${
        level === 'root' ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        {expanded !== undefined && (
          <span className="text-sm">{expanded ? '-' : '+'}</span>
        )}
        {label}
      </div>
    </button>
  );
}

// Component: Structure Flowchart
function StructureFlowchart({ structure, onSelect }: { structure: DSADataStructure; onSelect: () => void }) {
  const theme = getColorTheme(structure.id);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="backdrop-blur-xl bg-slate-800/20 border border-slate-700 rounded-xl p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${theme.gradient}`} />
          <span className="font-semibold text-white">{structure.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">{structure.subtypes.length} subtypes</span>
          {isExpanded ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
        </div>
      </button>

      {isExpanded && (
        <div className="mt-4 pl-6 border-l-2 border-slate-600 space-y-2">
          {structure.subtypes.map((subtype) => (
            <button
              key={subtype.id}
              onClick={onSelect}
              className="w-full text-left px-3 py-2 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
            >
              <span className={theme.text}>{subtype.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Component: Structure Card
function StructureCard({
  structure,
  isExpanded,
  onToggle,
  onSelectSubtype
}: {
  structure: DSADataStructure;
  isExpanded: boolean;
  onToggle: () => void;
  onSelectSubtype: (subtype: DSASubtype) => void;
}) {
  const theme = getColorTheme(structure.id);

  return (
    <div
      className={`backdrop-blur-xl bg-slate-800/30 border ${
        isExpanded ? theme.border : 'border-slate-700'
      } rounded-2xl overflow-hidden transition-all duration-300 ${
        isExpanded ? 'ring-2 ring-offset-2 ring-offset-slate-900' : ''
      }`}
      style={isExpanded ? { boxShadow: `0 0 40px rgba(var(--tw-shadow-color), 0.1)` } : {}}
    >
      <button
        onClick={onToggle}
        className={`w-full p-6 text-left transition-all duration-200 ${
          isExpanded ? `bg-gradient-to-r ${theme.gradient}` : 'hover:bg-slate-700/30'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isExpanded ? 'bg-white/20' : theme.light}`}>
              <span className={isExpanded ? 'text-white' : theme.text}>{structure.icon}</span>
            </div>
            <span className={`font-semibold text-lg ${isExpanded ? 'text-white' : 'text-white'}`}>
              {structure.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm px-2 py-1 rounded-full ${isExpanded ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-400'}`}>
              {structure.subtypes.length} types
            </span>
          </div>
        </div>
      </button>

      <div
        className={`transition-all duration-300 ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="p-4 space-y-3">
          {structure.subtypes.map((subtype) => (
            <button
              key={subtype.id}
              onClick={() => onSelectSubtype(subtype)}
              className={`w-full p-4 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600 text-left transition-all group`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white group-hover:text-purple-300">{subtype.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-300 transition-colors" />
              </div>
              <p className="text-sm text-slate-400 line-clamp-2">{subtype.definition}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Component: Simulator Section
function SimulatorSection({
  structures,
  history,
  onAddHistory,
  onRestoreHistory,
}: {
  structures: DSADataStructure[];
  history: HistoryEntry[];
  onAddHistory: (entry: HistoryEntry) => void;
  onRestoreHistory: (entry: HistoryEntry) => void;
}) {
  const [selectedStructure, setSelectedStructure] = useState<DSADataStructure | null>(null);
  const [selectedSubtype, setSelectedSubtype] = useState<DSASubtype | null>(null);

  const handleClearData = (structureName: string, subtypeName: string, data: string) => {
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      structureName,
      subtypeName,
      data,
      timestamp: new Date(),
    };
    onAddHistory(entry);
  };

  return (
    <>
      {/* Structure Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {structures.map((structure) => {
          const theme = getColorTheme(structure.id);
          const isActive = selectedStructure?.id === structure.id;
          return (
            <button
              key={structure.id}
              onClick={() => {
                setSelectedStructure(isActive ? null : structure);
                setSelectedSubtype(null);
              }}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                isActive
                  ? `bg-gradient-to-br ${theme.gradient} border-transparent text-white`
                  : 'bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-slate-600'
              }`}
            >
              <div className={`flex flex-col items-center gap-2`}>
                <span className={isActive ? 'text-white' : theme.text}>{structure.icon}</span>
                <span className="text-sm font-medium">{structure.name}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Subtype Selection */}
      {selectedStructure && (
        <div className="mb-8 animate-fadeIn">
          <h3 className="text-lg font-semibold text-white mb-4">Select {selectedStructure.name} Type</h3>
          <div className="flex flex-wrap gap-2">
            {selectedStructure.subtypes.map((subtype) => {
              const theme = getColorTheme(selectedStructure.id);
              const isActive = selectedSubtype?.id === subtype.id;
              return (
                <button
                  key={subtype.id}
                  onClick={() => setSelectedSubtype(isActive ? null : subtype)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? `bg-gradient-to-r ${theme.gradient} text-white shadow-lg`
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {subtype.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Simulator Panel */}
      {selectedStructure && selectedSubtype && (
        <SimulatorPanel
          structure={selectedStructure}
          subtype={selectedSubtype}
          onClear={(data) => handleClearData(selectedStructure.name, selectedSubtype.name, data)}
        />
      )}
    </>
  );
}

// Component: Simulator Panel
function SimulatorPanel({
  structure,
  subtype,
  onClear,
}: {
  structure: DSADataStructure;
  subtype: DSASubtype;
  onClear: (data: string) => void;
}) {
  const theme = getColorTheme(structure.id);

  return (
    <div className="backdrop-blur-xl bg-slate-800/30 border border-slate-700 rounded-2xl p-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.gradient}`}>
          {structure.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{subtype.name}</h3>
          <p className="text-sm text-slate-400">{structure.name}</p>
        </div>
      </div>

      {/* Theory Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <TheoryCard title="Definition" content={subtype.definition} theme={theme} />
          <TheoryCard title="Principle" content={subtype.principle} theme={theme} />
          <TheoryCard title="Real-World Example" content={subtype.realWorldExample} theme={theme} />
        </div>
        <div className="space-y-4">
          <ListCard title="Characteristics" items={subtype.characteristics} theme={theme} />
          <ListCard title="Advantages" items={subtype.advantages} theme={theme} isGood />
          <ListCard title="Disadvantages" items={subtype.disadvantages} theme={theme} isBad />
        </div>
      </div>

      {/* Applications */}
      <div className="mb-6">
        <h4 className={`text-sm font-semibold ${theme.text} mb-2`}>Applications</h4>
        <div className="flex flex-wrap gap-2">
          {subtype.applications.map((app, idx) => (
            <span key={idx} className={`px-3 py-1 rounded-full ${theme.light} ${theme.text} text-sm border ${theme.border}/30`}>
              {app}
            </span>
          ))}
        </div>
      </div>

      {/* Complexity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-slate-700/30 border border-slate-600">
          <h4 className="text-sm font-semibold text-blue-400 mb-2">Time Complexity</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(subtype.timeComplexity).map(([op, complexity]) => (
              <div key={op} className="flex justify-between text-sm">
                <span className="text-slate-400">{op}</span>
                <span className="text-blue-300 font-mono">{complexity}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-700/30 border border-slate-600">
          <h4 className="text-sm font-semibold text-green-400 mb-2">Space Complexity</h4>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Memory</span>
            <span className="text-green-300 font-mono">{subtype.spaceComplexity}</span>
          </div>
        </div>
      </div>

      {/* Interactive Simulator */}
      <InteractiveSimulator
        structure={structure}
        subtype={subtype}
        theme={theme}
        onClear={onClear}
      />
    </div>
  );
}

// Component: Theory Card
function TheoryCard({ title, content, theme }: { title: string; content: string; theme: typeof colorThemes.primitive }) {
  return (
    <div className="p-4 rounded-xl bg-slate-700/30 border border-slate-600">
      <h4 className={`text-sm font-semibold ${theme.text} mb-2`}>{title}</h4>
      <p className="text-sm text-slate-300">{content}</p>
    </div>
  );
}

// Component: List Card
function ListCard({ title, items, theme, isGood, isBad }: { title: string; items: string[]; theme: typeof colorThemes.primitive; isGood?: boolean; isBad?: boolean }) {
  const textColor = isGood ? 'text-green-400' : isBad ? 'text-red-400' : 'text-slate-400';
  return (
    <div className="p-4 rounded-xl bg-slate-700/30 border border-slate-600">
      <h4 className={`text-sm font-semibold ${theme.text} mb-2`}>{title}</h4>
      <ul className="space-y-1">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <span className={textColor}>{isGood ? '+' : isBad ? '-' : '>'}</span>
            <span className="text-slate-300">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component: Interactive Simulator
function InteractiveSimulator({
  structure,
  subtype,
  theme,
  onClear,
}: {
  structure: DSADataStructure;
  subtype: DSASubtype;
  theme: typeof colorThemes.primitive;
  onClear: (data: string) => void;
}) {
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [visualData, setVisualData] = useState<number[]>([]);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Graph specific state
  const [graphNodes, setGraphNodes] = useState<string[]>([]);
  const [graphEdges, setGraphEdges] = useState<[string, string][]>([]);
  const [isDirected, setIsDirected] = useState(true);

  const displayMessage = (text: string, type: 'success' | 'error' | 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleClear = () => {
    const dataStr = JSON.stringify(visualData);
    if (visualData.length > 0) {
      onClear(dataStr);
    }
    setVisualData([]);
    setOutput([]);
    setInputValue('');
    displayMessage('Data cleared successfully', 'success');
  };

  const handleDownload = () => {
    const state = {
      structure: structure.name,
      subtype: subtype.name,
      timestamp: new Date().toISOString(),
      data: structure.id === 'graph' ? { nodes: graphNodes, edges: graphEdges } : visualData,
      operationLog: output,
    };
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${structure.id}-${subtype.id}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    displayMessage('State downloaded successfully', 'success');
  };

  // Array Operations
  const arrayInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      displayMessage('Please enter a valid number', 'error');
      return;
    }
    setVisualData([...visualData, value]);
    setOutput([...output, `Inserted ${value} at index ${visualData.length}`]);
    displayMessage(`Inserted ${value}`, 'success');
    setInputValue('');
  };

  const arrayDelete = () => {
    const index = parseInt(inputValue);
    if (isNaN(index) || index < 0 || index >= visualData.length) {
      displayMessage('Please enter a valid index', 'error');
      return;
    }
    const deleted = visualData[index];
    const newData = visualData.filter((_, i) => i !== index);
    setVisualData(newData);
    setOutput([...output, `Deleted ${deleted} at index ${index}`]);
    displayMessage(`Deleted ${deleted}`, 'success');
    setInputValue('');
  };

  const arraySearch = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      displayMessage('Please enter a valid number', 'error');
      return;
    }
    const index = visualData.indexOf(value);
    if (index !== -1) {
      setOutput([...output, `Found ${value} at index ${index}`]);
      displayMessage(`Found at index ${index}`, 'success');
    } else {
      setOutput([...output, `${value} not found`]);
      displayMessage('Not found', 'error');
    }
    setInputValue('');
  };

  const arrayTraverse = () => {
    const traversal = visualData.map((v, i) => `[${i}]=${v}`).join(' -> ');
    setOutput([...output, `Traverse: ${traversal || 'Empty'}`]);
    displayMessage('Array traversed', 'info');
  };

  // Stack Operations
  const stackPush = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      displayMessage('Please enter a valid number', 'error');
      return;
    }
    setVisualData([...visualData, value]);
    setOutput([...output, `Pushed ${value} onto stack`]);
    displayMessage(`Pushed ${value}`, 'success');
    setInputValue('');
  };

  const stackPop = () => {
    if (visualData.length === 0) {
      displayMessage('Stack underflow', 'error');
      return;
    }
    const popped = visualData[visualData.length - 1];
    setVisualData(visualData.slice(0, -1));
    setOutput([...output, `Popped ${popped} from stack`]);
    displayMessage(`Popped ${popped}`, 'success');
  };

  const stackPeek = () => {
    if (visualData.length === 0) {
      displayMessage('Stack is empty', 'error');
      return;
    }
    const peeked = visualData[visualData.length - 1];
    setOutput([...output, `Peek: ${peeked}`]);
    displayMessage(`Top element: ${peeked}`, 'info');
  };

  // Queue Operations
  const queueEnqueue = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      displayMessage('Please enter a valid number', 'error');
      return;
    }
    setVisualData([...visualData, value]);
    setOutput([...output, `Enqueued ${value}`]);
    displayMessage(`Enqueued ${value}`, 'success');
    setInputValue('');
  };

  const queueDequeue = () => {
    if (visualData.length === 0) {
      displayMessage('Queue underflow', 'error');
      return;
    }
    const dequeued = visualData[0];
    setVisualData(visualData.slice(1));
    setOutput([...output, `Dequeued ${dequeued}`]);
    displayMessage(`Dequeued ${dequeued}`, 'success');
  };

  const queueFront = () => {
    if (visualData.length === 0) {
      displayMessage('Queue is empty', 'error');
      return;
    }
    setOutput([...output, `Front: ${visualData[0]}`]);
    displayMessage(`Front: ${visualData[0]}`, 'info');
  };

  const queueRear = () => {
    if (visualData.length === 0) {
      displayMessage('Queue is empty', 'error');
      return;
    }
    setOutput([...output, `Rear: ${visualData[visualData.length - 1]}`]);
    displayMessage(`Rear: ${visualData[visualData.length - 1]}`, 'info');
  };

  // Priority Queue Operations
  const priorityQueueInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      displayMessage('Please enter a valid number', 'error');
      return;
    }
    const newData = [...visualData, value].sort((a, b) => b - a);
    setVisualData(newData);
    setOutput([...output, `Inserted ${value} (priority sorted)`]);
    displayMessage(`Inserted ${value}`, 'success');
    setInputValue('');
  };

  // Deque Operations
  const dequeAddFront = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      displayMessage('Please enter a valid number', 'error');
      return;
    }
    setVisualData([value, ...visualData]);
    setOutput([...output, `Added ${value} at front`]);
    displayMessage(`Added ${value} at front`, 'success');
    setInputValue('');
  };

  const dequeAddRear = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      displayMessage('Please enter a valid number', 'error');
      return;
    }
    setVisualData([...visualData, value]);
    setOutput([...output, `Added ${value} at rear`]);
    displayMessage(`Added ${value} at rear`, 'success');
    setInputValue('');
  };

  const dequeDeleteFront = () => {
    if (visualData.length === 0) {
      displayMessage('Deque is empty', 'error');
      return;
    }
    const deleted = visualData[0];
    setVisualData(visualData.slice(1));
    setOutput([...output, `Deleted ${deleted} from front`]);
    displayMessage(`Deleted ${deleted}`, 'success');
  };

  const dequeDeleteRear = () => {
    if (visualData.length === 0) {
      displayMessage('Deque is empty', 'error');
      return;
    }
    const deleted = visualData[visualData.length - 1];
    setVisualData(visualData.slice(0, -1));
    setOutput([...output, `Deleted ${deleted} from rear`]);
    displayMessage(`Deleted ${deleted}`, 'success');
  };

  // Linked List Operations
  const linkedListInsertHead = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      displayMessage('Please enter a valid number', 'error');
      return;
    }
    setVisualData([value, ...visualData]);
    setOutput([...output, `Inserted ${value} at head`]);
    displayMessage(`Inserted ${value} at head`, 'success');
    setInputValue('');
  };

  const linkedListInsertTail = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      displayMessage('Please enter a valid number', 'error');
      return;
    }
    setVisualData([...visualData, value]);
    setOutput([...output, `Inserted ${value} at tail`]);
    displayMessage(`Inserted ${value} at tail`, 'success');
    setInputValue('');
  };

  const linkedListDelete = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      displayMessage('Please enter a valid number', 'error');
      return;
    }
    const index = visualData.indexOf(value);
    if (index === -1) {
      displayMessage('Value not found', 'error');
      return;
    }
    setVisualData(visualData.filter((_, i) => i !== index));
    setOutput([...output, `Deleted ${value} from list`]);
    displayMessage(`Deleted ${value}`, 'success');
    setInputValue('');
  };

  const linkedListTraversal = () => {
    const traversal = visualData.join(' -> ');
    setOutput([...output, `Traversal: ${traversal || 'NULL'}`]);
    displayMessage('Linked list traversed', 'info');
  };

  // Tree Operations
  const treeInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      displayMessage('Please enter a valid number', 'error');
      return;
    }
    setVisualData([...visualData, value]);
    setOutput([...output, `Inserted ${value} into tree`]);
    displayMessage(`Inserted ${value}`, 'success');
    setInputValue('');
  };

  const treeDelete = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      displayMessage('Please enter a valid number', 'error');
      return;
    }
    const index = visualData.indexOf(value);
    if (index === -1) {
      displayMessage('Value not found', 'error');
      return;
    }
    setVisualData(visualData.filter((_, i) => i !== index));
    setOutput([...output, `Deleted ${value} from tree`]);
    displayMessage(`Deleted ${value}`, 'success');
    setInputValue('');
  };

  const treeTraverseInorder = () => {
    const sorted = [...visualData].sort((a, b) => a - b);
    setOutput([...output, `Inorder: ${sorted.join(' -> ')}`]);
    displayMessage('Inorder traversal complete', 'info');
  };

  const treeTraversePreorder = () => {
    setOutput([...output, `Preorder: ${visualData.join(' -> ')}`]);
    displayMessage('Preorder traversal complete', 'info');
  };

  const treeTraversePostorder = () => {
    const postorder = [...visualData].reverse();
    setOutput([...output, `Postorder: ${postorder.join(' -> ')}`]);
    displayMessage('Postorder traversal complete', 'info');
  };

  // Heap Operations
  const heapInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      displayMessage('Please enter a valid number', 'error');
      return;
    }
    const newData = [...visualData, value];
    let i = newData.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (newData[parent] < newData[i]) {
        [newData[parent], newData[i]] = [newData[i], newData[parent]];
        i = parent;
      } else break;
    }
    setVisualData(newData);
    setOutput([...output, `Inserted ${value} into heap`]);
    displayMessage(`Inserted ${value}`, 'success');
    setInputValue('');
  };

  const heapExtract = () => {
    if (visualData.length === 0) {
      displayMessage('Heap is empty', 'error');
      return;
    }
    const max = visualData[0];
    const newData = [...visualData];
    newData[0] = newData[newData.length - 1];
    newData.pop();
    let i = 0;
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let largest = i;
      if (left < newData.length && newData[left] > newData[largest]) largest = left;
      if (right < newData.length && newData[right] > newData[largest]) largest = right;
      if (largest !== i) {
        [newData[i], newData[largest]] = [newData[largest], newData[i]];
        i = largest;
      } else break;
    }
    setVisualData(newData);
    setOutput([...output, `Extracted max: ${max}`]);
    displayMessage(`Extracted ${max}`, 'success');
  };

  const heapPeek = () => {
    if (visualData.length === 0) {
      displayMessage('Heap is empty', 'error');
      return;
    }
    setOutput([...output, `Heap max: ${visualData[0]}`]);
    displayMessage(`Max: ${visualData[0]}`, 'info');
  };

  // Graph Operations
  const graphAddVertex = () => {
    const vertex = inputValue.trim().toUpperCase();
    if (!vertex || graphNodes.includes(vertex)) {
      displayMessage('Invalid or duplicate vertex', 'error');
      return;
    }
    setGraphNodes([...graphNodes, vertex]);
    setOutput([...output, `Added vertex: ${vertex}`]);
    displayMessage(`Added vertex ${vertex}`, 'success');
    setInputValue('');
  };

  const graphRemoveVertex = () => {
    const vertex = inputValue.trim().toUpperCase();
    if (!graphNodes.includes(vertex)) {
      displayMessage('Vertex not found', 'error');
      return;
    }
    setGraphNodes(graphNodes.filter(v => v !== vertex));
    setGraphEdges(graphEdges.filter(([u, v]) => u !== vertex && v !== vertex));
    setOutput([...output, `Removed vertex: ${vertex}`]);
    displayMessage(`Removed vertex ${vertex}`, 'success');
    setInputValue('');
  };

  const graphAddEdge = () => {
    const vertices = inputValue.trim().toUpperCase().split(/[\s,]+/).filter(v => v);
    if (vertices.length < 2) {
      displayMessage('Please enter two vertices (e.g., A,B)', 'error');
      return;
    }
    const [u, v] = vertices;
    if (!graphNodes.includes(u) || !graphNodes.includes(v)) {
      displayMessage('One or both vertices not found', 'error');
      return;
    }
    setGraphEdges([...graphEdges, [u, v]]);
    if (!isDirected) {
      setGraphEdges(prev => [...prev, [v, u]]);
    }
    setOutput([...output, `Added edge: ${u} -> ${v}`]);
    displayMessage(`Added edge ${u} -> ${v}`, 'success');
    setInputValue('');
  };

  const graphRemoveEdge = () => {
    const vertices = inputValue.trim().toUpperCase().split(/[\s,]+/).filter(v => v);
    if (vertices.length < 2) {
      displayMessage('Please enter two vertices (e.g., A,B)', 'error');
      return;
    }
    const [u, v] = vertices;
    const newEdges = graphEdges.filter(([a, b]) => !(a === u && b === v));
    setGraphEdges(newEdges);
    setOutput([...output, `Removed edge: ${u} -> ${v}`]);
    displayMessage(`Removed edge ${u} -> ${v}`, 'success');
    setInputValue('');
  };

  const graphBFS = () => {
    const start = inputValue.trim().toUpperCase() || graphNodes[0];
    if (!graphNodes.includes(start)) {
      displayMessage('Start vertex not found', 'error');
      return;
    }
    const visited = new Set<string>();
    const queue = [start];
    const result: string[] = [];
    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current)) continue;
      visited.add(current);
      result.push(current);
      for (const [u, v] of graphEdges) {
        if (u === current && !visited.has(v)) {
          queue.push(v);
        }
      }
    }
    setOutput([...output, `BFS: ${result.join(' -> ')}`]);
    displayMessage('BFS complete', 'info');
    setInputValue('');
  };

  const graphDFS = () => {
    const start = inputValue.trim().toUpperCase() || graphNodes[0];
    if (!graphNodes.includes(start)) {
      displayMessage('Start vertex not found', 'error');
      return;
    }
    const visited = new Set<string>();
    const result: string[] = [];
    const dfs = (node: string) => {
      if (visited.has(node)) return;
      visited.add(node);
      result.push(node);
      for (const [u, v] of graphEdges) {
        if (u === node && !visited.has(v)) {
          dfs(v);
        }
      }
    };
    dfs(start);
    setOutput([...output, `DFS: ${result.join(' -> ')}`]);
    displayMessage('DFS complete', 'info');
    setInputValue('');
  };

  const graphDetectCycle = () => {
    const visited = new Set<string>();
    const recStack = new Set<string>();
    let hasCycle = false;

    const dfs = (node: string, parent: string | null): boolean => {
      visited.add(node);
      recStack.add(node);
      for (const [u, v] of graphEdges) {
        if (u === node) {
          if (!visited.has(v) && dfs(v, node)) {
            hasCycle = true;
            return true;
          } else if (recStack.has(v) && v !== parent) {
            hasCycle = true;
            return true;
          }
        }
      }
      recStack.delete(node);
      return false;
    };

    for (const node of graphNodes) {
      if (!visited.has(node)) {
        dfs(node, null);
      }
    }
    setOutput([...output, `Cycle Detection: ${hasCycle ? 'Cycle found!' : 'No cycle'}`]);
    displayMessage(hasCycle ? 'Cycle detected' : 'No cycle found', hasCycle ? 'error' : 'success');
  };

  const graphTopologicalSort = () => {
    const inDegree: Record<string, number> = {};
    graphNodes.forEach(n => inDegree[n] = 0);
    graphEdges.forEach(([u, v]) => {
      inDegree[v] = (inDegree[v] || 0) + 1;
    });

    const queue = graphNodes.filter(n => inDegree[n] === 0);
    const result: string[] = [];

    while (queue.length > 0) {
      const current = queue.shift()!;
      result.push(current);
      for (const [u, v] of graphEdges) {
        if (u === current) {
          inDegree[v]--;
          if (inDegree[v] === 0) {
            queue.push(v);
          }
        }
      }
    }

    if (result.length === graphNodes.length) {
      setOutput([...output, `Topological Sort: ${result.join(' -> ')}`]);
      displayMessage('Topological sort complete', 'success');
    } else {
      setOutput([...output, 'Cannot perform topological sort: cycle detected']);
      displayMessage('Graph has a cycle', 'error');
    }
  };

  const clearGraph = () => {
    const data = JSON.stringify({ nodes: graphNodes, edges: graphEdges });
    if (graphNodes.length > 0 || graphEdges.length > 0) {
      onClear(data);
    }
    setGraphNodes([]);
    setGraphEdges([]);
    setOutput([]);
    displayMessage('Graph cleared', 'success');
  };

  // Circular Stack Operations
  const circularStackPush = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      displayMessage('Please enter a valid number', 'error');
      return;
    }
    const maxSize = 5;
    let newData = [...visualData];
    if (newData.length >= maxSize) {
      newData = [...newData.slice(1), value];
      setOutput([...output, `Circular overwrite: Pushed ${value}`]);
    } else {
      newData = [...newData, value];
      setOutput([...output, `Pushed ${value}`]);
    }
    setVisualData(newData);
    displayMessage(`Pushed ${value}`, 'success');
    setInputValue('');
  };

  // Circular Queue Operations
  const circularQueueEnqueue = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      displayMessage('Please enter a valid number', 'error');
      return;
    }
    const maxSize = 5;
    let newData = [...visualData];
    if (newData.length >= maxSize) {
      newData = [...newData.slice(1), value];
      setOutput([...output, `Circular overwrite: Enqueued ${value}`]);
    } else {
      newData = [...newData, value];
      setOutput([...output, `Enqueued ${value}`]);
    }
    setVisualData(newData);
    displayMessage(`Enqueued ${value}`, 'success');
    setInputValue('');
  };

  // Render based on structure type
  const renderOperations = () => {
    const type = structure.id;

    // Graph has special handling
    if (type === 'graph') {
      return (
        <>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setIsDirected(!isDirected)}
              className={`px-3 py-2 rounded-lg text-sm ${isDirected ? 'bg-purple-500' : 'bg-slate-600'}`}
            >
              {isDirected ? 'Directed' : 'Undirected'}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            <button onClick={graphAddVertex} className="p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-medium transition-all">
              <Plus className="w-4 h-4 inline mr-2" />Add Vertex
            </button>
            <button onClick={graphRemoveVertex} className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium transition-all">
              <Trash2 className="w-4 h-4 inline mr-2" />Remove Vertex
            </button>
            <button onClick={graphAddEdge} className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium transition-all">
              <Plus className="w-4 h-4 inline mr-2" />Add Edge
            </button>
            <button onClick={graphRemoveEdge} className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium transition-all">
              <Trash2 className="w-4 h-4 inline mr-2" />Remove Edge
            </button>
            <button onClick={graphBFS} className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium transition-all">
              BFS
            </button>
            <button onClick={graphDFS} className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium transition-all">
              DFS
            </button>
            <button onClick={graphDetectCycle} className="p-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium transition-all">
              Cycle Detection
            </button>
            <button onClick={graphTopologicalSort} className="p-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium transition-all">
              Topological Sort
            </button>
          </div>

          {/* Graph Visualization */}
          <div className="mb-4 p-6 rounded-xl bg-slate-900/50 border border-slate-600 min-h-[200px]">
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {graphNodes.map((node) => (
                <div key={node} className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/30">
                    {node}
                  </div>
                  {graphEdges
                    .filter(([u]) => u === node)
                    .map(([u, v], idx) => (
                      <div key={idx} className="absolute -right-2 top-1/2 transform translate-x-full">
                        <div className="flex items-center text-xs text-cyan-300">
                          <ChevronRight className="w-4 h-4" />
                          <span>{v}</span>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
              {graphNodes.length === 0 && (
                <div className="text-slate-500 text-center">No vertices added</div>
              )}
            </div>
            <div className="text-center text-sm text-slate-400">
              Edges: {graphEdges.length > 0 ? graphEdges.map(([u, v]) => `${u}->${v}`).join(', ') : 'None'}
            </div>
          </div>

          <button onClick={clearGraph} className="w-full p-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all">
            <RotateCcw className="w-4 h-4 inline mr-2" />Clear Graph
          </button>
        </>
      );
    }

    // Heap operations
    if (subtype.id === 'heap') {
      return (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            <button onClick={heapInsert} className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium transition-all">
              <Plus className="w-4 h-4 inline mr-2" />Insert
            </button>
            <button onClick={heapExtract} className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium transition-all">
              <Trash2 className="w-4 h-4 inline mr-2" />Extract Max
            </button>
            <button onClick={heapPeek} className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium transition-all">
              <Eye className="w-4 h-4 inline mr-2" />Peek
            </button>
            <button onClick={handleClear} className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all">
              <RotateCcw className="w-4 h-4 inline mr-2" />Clear
            </button>
          </div>

          {/* Heap Visualization */}
          <div className="mb-4 p-6 rounded-xl bg-slate-900/50 border border-slate-600">
            <div className="flex flex-col items-center">
              <div className="flex flex-wrap justify-center gap-2">
                {visualData.map((value, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white font-bold shadow-lg"
                  >
                    {value}
                  </div>
                ))}
              </div>
              {visualData.length === 0 && (
                <div className="text-slate-500">Heap is empty</div>
              )}
            </div>
            <div className="mt-4 text-center text-sm text-slate-400">
              Array: [{visualData.join(', ')}]
            </div>
          </div>
        </>
      );
    }

    // Tree operations (non-heap)
    if (type === 'tree' && subtype.id !== 'heap') {
      return (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            <button onClick={treeInsert} className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium transition-all">
              <Plus className="w-4 h-4 inline mr-2" />Insert
            </button>
            <button onClick={treeDelete} className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium transition-all">
              <Trash2 className="w-4 h-4 inline mr-2" />Delete
            </button>
            <button onClick={treeTraverseInorder} className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium transition-all">
              Inorder
            </button>
            <button onClick={treeTraversePreorder} className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium transition-all">
              Preorder
            </button>
            <button onClick={treeTraversePostorder} className="p-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium transition-all">
              Postorder
            </button>
            <button onClick={handleClear} className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all">
              <RotateCcw className="w-4 h-4 inline mr-2" />Clear
            </button>
          </div>

          {/* Tree Visualization */}
          <div className="mb-4 p-6 rounded-xl bg-slate-900/50 border border-slate-600">
            <div className="flex flex-wrap justify-center gap-4">
              {visualData.map((value, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center text-white font-bold shadow-lg shadow-red-500/30"
                >
                  {value}
                </div>
              ))}
              {visualData.length === 0 && (
                <div className="text-slate-500">Tree is empty</div>
              )}
            </div>
          </div>
        </>
      );
    }

    // Linked List operations
    if (type === 'linkedlist') {
      return (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            <button onClick={linkedListInsertHead} className="p-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium transition-all">
              <Plus className="w-4 h-4 inline mr-2" />Insert Head
            </button>
            <button onClick={linkedListInsertTail} className="p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-medium transition-all">
              <Plus className="w-4 h-4 inline mr-2" />Insert Tail
            </button>
            <button onClick={linkedListDelete} className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium transition-all">
              <Trash2 className="w-4 h-4 inline mr-2" />Delete
            </button>
            <button onClick={arraySearch} className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium transition-all">
              <Search className="w-4 h-4 inline mr-2" />Search
            </button>
            <button onClick={linkedListTraversal} className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium transition-all">
              Traversal
            </button>
            <button onClick={handleClear} className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all">
              <RotateCcw className="w-4 h-4 inline mr-2" />Clear
            </button>
          </div>

          {/* Linked List Visualization */}
          <div className="mb-4 p-6 rounded-xl bg-slate-900/50 border border-slate-600 overflow-x-auto">
            <div className="flex items-center justify-center gap-1 min-w-fit">
              {visualData.map((value, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center gap-1">
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/30">
                      {value}
                    </div>
                    {index < visualData.length - 1 ? (
                      <ChevronRight className="w-6 h-6 text-teal-400" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-500" />
                    )}
                  </div>
                </React.Fragment>
              ))}
              {visualData.length === 0 && (
                <div className="text-slate-500">NULL</div>
              )}
            </div>
          </div>
        </>
      );
    }

    // Deque operations
    if (subtype.id === 'deque') {
      return (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            <button onClick={dequeAddFront} className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium transition-all">
              <Plus className="w-4 h-4 inline mr-2" />Add Front
            </button>
            <button onClick={dequeAddRear} className="p-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium transition-all">
              <Plus className="w-4 h-4 inline mr-2" />Add Rear
            </button>
            <button onClick={dequeDeleteFront} className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium transition-all">
              <Trash2 className="w-4 h-4 inline mr-2" />Del Front
            </button>
            <button onClick={dequeDeleteRear} className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium transition-all">
              <Trash2 className="w-4 h-4 inline mr-2" />Del Rear
            </button>
            <button onClick={queueFront} className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium transition-all">
              <Eye className="w-4 h-4 inline mr-2" />Front
            </button>
            <button onClick={queueRear} className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium transition-all">
              <Eye className="w-4 h-4 inline mr-2" />Rear
            </button>
            <button onClick={handleClear} className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all col-span-2">
              <RotateCcw className="w-4 h-4 inline mr-2" />Clear
            </button>
          </div>

          {/* Deque Visualization */}
          <div className="mb-4 p-6 rounded-xl bg-slate-900/50 border border-slate-600">
            <div className="flex items-center gap-2 justify-center flex-wrap">
              <ArrowUp className="w-6 h-6 text-green-400 -rotate-90" />
              {visualData.map((value, index) => (
                <div
                  key={index}
                  className={`w-14 h-14 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-bold shadow-lg ${index === 0 ? 'ring-2 ring-green-300' : ''} ${index === visualData.length - 1 ? 'ring-2 ring-green-300' : ''}`}
                >
                  {value}
                </div>
              ))}
              <ArrowUp className="w-6 h-6 text-green-400 rotate-90" />
              {visualData.length === 0 && (
                <div className="text-slate-500">Empty</div>
              )}
            </div>
            <div className="mt-4 text-center text-sm text-slate-400">
              Front &lt;---&gt; Rear
            </div>
          </div>
        </>
      );
    }

    // Priority Queue operations
    if (subtype.id === 'priority-queue') {
      return (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            <button onClick={priorityQueueInsert} className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium transition-all">
              <Plus className="w-4 h-4 inline mr-2" />Insert
            </button>
            <button onClick={queueDequeue} className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium transition-all">
              <Trash2 className="w-4 h-4 inline mr-2" />Extract Max
            </button>
            <button onClick={queueFront} className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium transition-all">
              <Eye className="w-4 h-4 inline mr-2" />Peek
            </button>
            <button onClick={handleClear} className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all">
              <RotateCcw className="w-4 h-4 inline mr-2" />Clear
            </button>
          </div>

          {/* Priority Queue Visualization */}
          <div className="mb-4 p-6 rounded-xl bg-slate-900/50 border border-slate-600">
            <div className="flex items-center gap-2 justify-center flex-wrap">
              {visualData.map((value, index) => (
                <div
                  key={index}
                  className={`w-14 h-14 rounded-lg ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 ring-2 ring-yellow-300' : 'bg-gradient-to-r from-green-500 to-green-600'} flex items-center justify-center text-white font-bold shadow-lg`}
                >
                  {value}
                </div>
              ))}
              {visualData.length === 0 && (
                <div className="text-slate-500">Empty</div>
              )}
            </div>
            <div className="mt-4 text-center text-sm text-slate-400">
              Sorted by priority (highest first)
            </div>
          </div>
        </>
      );
    }

    // Circular Stack operations
    if (subtype.id === 'circular-stack') {
      return (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            <button onClick={circularStackPush} className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium transition-all">
              <Plus className="w-4 h-4 inline mr-2" />Push
            </button>
            <button onClick={stackPop} className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium transition-all">
              <Trash2 className="w-4 h-4 inline mr-2" />Pop
            </button>
            <button onClick={stackPeek} className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium transition-all">
              <Eye className="w-4 h-4 inline mr-2" />Peek
            </button>
            <button onClick={handleClear} className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all">
              <RotateCcw className="w-4 h-4 inline mr-2" />Clear
            </button>
          </div>
          <div className="text-sm text-slate-400 mb-4 text-center">Max capacity: 5 (oldest overwritten when full)</div>

          {/* Circular Stack Visualization */}
          <div className="mb-4 p-6 rounded-xl bg-slate-900/50 border border-slate-600 flex flex-col items-center">
            <div className="flex flex-col gap-2 items-center">
              {visualData.slice().reverse().map((value, idx) => (
                <div
                  key={idx}
                  className={`w-16 h-10 rounded-lg ${idx === 0 ? 'bg-gradient-to-r from-orange-400 to-orange-500 ring-2 ring-orange-300' : 'bg-gradient-to-r from-orange-600 to-orange-700'} flex items-center justify-center text-white font-bold shadow-lg`}
                >
                  {value}
                </div>
              ))}
              <div className="text-slate-500 text-xs">BOTTOM</div>
            </div>
            {visualData.length === 0 && <div className="text-slate-500">Empty</div>}
          </div>
        </>
      );
    }

    // Circular Queue operations
    if (subtype.id === 'circular-queue') {
      return (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            <button onClick={circularQueueEnqueue} className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium transition-all">
              <Plus className="w-4 h-4 inline mr-2" />Enqueue
            </button>
            <button onClick={queueDequeue} className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium transition-all">
              <Trash2 className="w-4 h-4 inline mr-2" />Dequeue
            </button>
            <button onClick={queueFront} className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium transition-all">
              <Eye className="w-4 h-4 inline mr-2" />Front
            </button>
            <button onClick={queueRear} className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium transition-all">
              <Eye className="w-4 h-4 inline mr-2" />Rear
            </button>
            <button onClick={handleClear} className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all col-span-2">
              <RotateCcw className="w-4 h-4 inline mr-2" />Clear
            </button>
          </div>
          <div className="text-sm text-slate-400 mb-4 text-center">Max capacity: 5 (circular buffer)</div>

          {/* Circular Queue Visualization */}
          <div className="mb-4 p-6 rounded-xl bg-slate-900/50 border border-slate-600">
            <div className="flex items-center gap-1 justify-center">
              {[0, 1, 2, 3, 4].map((slot) => {
                const value = visualData[slot];
                return (
                  <div
                    key={slot}
                    className={`w-14 h-14 rounded-lg border-2 ${value !== undefined ? 'bg-gradient-to-r from-green-500 to-green-600 border-green-400' : 'border-slate-600 bg-slate-800'} flex items-center justify-center text-white font-bold`}
                  >
                    {value !== undefined ? value : slot}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex justify-between text-xs text-slate-400">
              <span>Front: {visualData[0] ?? '-'}</span>
              <span>Rear: {visualData[visualData.length - 1] ?? '-'}</span>
            </div>
          </div>
        </>
      );
    }

    // Stack operations
    if (type === 'stack') {
      return (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            <button onClick={stackPush} className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium transition-all">
              <Plus className="w-4 h-4 inline mr-2" />Push
            </button>
            <button onClick={stackPop} className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium transition-all">
              <Trash2 className="w-4 h-4 inline mr-2" />Pop
            </button>
            <button onClick={stackPeek} className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium transition-all">
              <Eye className="w-4 h-4 inline mr-2" />Peek
            </button>
            <button onClick={handleClear} className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all">
              <RotateCcw className="w-4 h-4 inline mr-2" />Clear
            </button>
          </div>

          {/* Stack Visualization */}
          <div className="mb-4 p-6 rounded-xl bg-slate-900/50 border border-slate-600 flex flex-col items-center">
            <div className="text-xs text-slate-400 mb-2">TOP</div>
            <div className="flex flex-col gap-2 items-center">
              {visualData.slice().reverse().map((value, idx) => (
                <div
                  key={idx}
                  className={`w-16 h-10 rounded-lg ${idx === 0 ? 'bg-gradient-to-r from-orange-400 to-orange-500 ring-2 ring-orange-300' : 'bg-gradient-to-r from-orange-600 to-orange-700'} flex items-center justify-center text-white font-bold shadow-lg`}
                >
                  {value}
                </div>
              ))}
              <div className="text-slate-500 text-xs">BOTTOM</div>
            </div>
            {visualData.length === 0 && <div className="text-slate-500">Empty</div>}
          </div>
        </>
      );
    }

    // Queue operations
    if (type === 'queue') {
      return (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            <button onClick={queueEnqueue} className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium transition-all">
              <Plus className="w-4 h-4 inline mr-2" />Enqueue
            </button>
            <button onClick={queueDequeue} className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium transition-all">
              <Trash2 className="w-4 h-4 inline mr-2" />Dequeue
            </button>
            <button onClick={queueFront} className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium transition-all">
              <Eye className="w-4 h-4 inline mr-2" />Front
            </button>
            <button onClick={queueRear} className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium transition-all">
              <Eye className="w-4 h-4 inline mr-2" />Rear
            </button>
            <button onClick={handleClear} className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all col-span-2">
              <RotateCcw className="w-4 h-4 inline mr-2" />Clear
            </button>
          </div>

          {/* Queue Visualization */}
          <div className="mb-4 p-6 rounded-xl bg-slate-900/50 border border-slate-600">
            <div className="flex items-center gap-1 justify-center">
              <span className="text-xs text-slate-400 mr-2">FRONT --&gt;</span>
              {visualData.map((value, index) => (
                <div
                  key={index}
                  className={`w-14 h-14 rounded-lg ${index === 0 ? 'bg-gradient-to-r from-green-400 to-green-500 ring-2 ring-green-300' : 'bg-gradient-to-r from-green-500 to-green-600'} flex items-center justify-center text-white font-bold shadow-lg`}
                >
                  {value}
                </div>
              ))}
              <span className="text-xs text-slate-400 ml-2">&lt;-- REAR</span>
              {visualData.length === 0 && (
                <div className="text-slate-500">Empty</div>
              )}
            </div>
          </div>
        </>
      );
    }

    // Array operations (default) and Primitive
    return (
      <>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          <button onClick={arrayInsert} className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium transition-all">
            <Plus className="w-4 h-4 inline mr-2" />Insert
          </button>
          <button onClick={arrayDelete} className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium transition-all">
            <Trash2 className="w-4 h-4 inline mr-2" />Delete
          </button>
          <button onClick={arraySearch} className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium transition-all">
            <Search className="w-4 h-4 inline mr-2" />Search
          </button>
          <button onClick={arrayTraverse} className="p-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium transition-all">
            Traverse
          </button>
          <button onClick={handleClear} className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all col-span-2 md:col-span-3">
            <RotateCcw className="w-4 h-4 inline mr-2" />Clear
          </button>
          <button onClick={handleDownload} className="p-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-all col-span-2 md:col-span-1">
            <Download className="w-4 h-4 inline mr-2" />Download
          </button>
        </div>

        {/* Array Visualization */}
        <div className="mb-4 p-6 rounded-xl bg-slate-900/50 border border-slate-600">
          <div className="flex items-center gap-2 justify-center flex-wrap">
            {visualData.map((value, index) => (
              <div
                key={index}
                className="flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30">
                  {value}
                </div>
                <span className="text-xs text-slate-500 mt-1">[{index}]</span>
              </div>
            ))}
            {visualData.length === 0 && (
              <div className="text-slate-500">Empty Array</div>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="backdrop-blur-xl bg-slate-800/50 border border-slate-600 rounded-xl p-6 mt-6">
      <h4 className="text-lg font-semibold text-white mb-4">Interactive Operations</h4>

      {/* Input Field */}
      {structure.id !== 'graph' && (
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value (number)"
            className="flex-1 px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                if (structure.id === 'array' || structure.id === 'primitive') arrayInsert();
                else if (structure.id === 'stack') stackPush();
                else if (structure.id === 'queue') queueEnqueue();
                else if (structure.id === 'linkedlist') linkedListInsertTail();
                else if (structure.id === 'tree') treeInsert();
              }
            }}
          />
        </div>
      )}

      {/* Graph Input */}
      {structure.id === 'graph' && (
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter vertex(s) (e.g., A or A,B)"
            className="flex-1 px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      )}

      {/* Message Display */}
      {message && (
        <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
          message.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
          message.type === 'error' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
          'bg-blue-500/20 text-blue-400 border border-blue-500/30'
        }`}>
          {message.type === 'success' && <CheckCircle className="w-4 h-4" />}
          {message.type === 'error' && <AlertCircle className="w-4 h-4" />}
          {message.type === 'info' && <Info className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Operations */}
      {renderOperations()}

      {/* Current State */}
      <div className="mt-4 p-3 rounded-lg bg-slate-900/50 border border-slate-700">
        <h5 className="text-sm font-medium text-slate-400 mb-2">Current State</h5>
        <p className="text-sm text-slate-300 font-mono">
          {structure.id === 'graph'
            ? `Nodes: [${graphNodes.join(', ')}] | Edges: [${graphEdges.map(([u, v]) => `${u}->${v}`).join(', ')}]`
            : `[${visualData.join(', ')}]`
          }
        </p>
      </div>

      {/* Output Log */}
      {output.length > 0 && (
        <div className="mt-4">
          <h5 className="text-sm font-medium text-slate-400 mb-2">Operation Log</h5>
          <div className="max-h-40 overflow-y-auto space-y-1 p-3 rounded-lg bg-slate-900/50 border border-slate-700">
            {output.map((line, index) => (
              <div key={index} className="text-sm text-slate-300 font-mono">
                {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Component: History Entry Card
function HistoryEntryCard({
  entry,
  onRestore,
  onDelete,
}: {
  entry: HistoryEntry;
  onRestore: (entry: HistoryEntry) => void;
  onDelete: () => void;
}) {
  const theme = colorThemes.history;

  return (
    <div className={`p-4 rounded-xl ${theme.light} border ${theme.border}/30 hover:border-yellow-500/50 transition-colors`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`font-medium ${theme.text}`}>{entry.structureName}</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
            <span className="font-medium text-white">{entry.subtypeName}</span>
          </div>
          <div className="text-sm text-slate-400 font-mono bg-slate-800/50 p-2 rounded max-h-20 overflow-hidden">
            {entry.data}
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            {entry.timestamp.toLocaleString()}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              const restored: HistoryEntry = {
                ...entry,
                id: crypto.randomUUID(),
                timestamp: new Date(),
              };
              onRestore(restored);
            }}
            className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-colors"
            title="Restore Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
            title="Delete Entry"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
