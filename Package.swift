// swift-tools-version: 6.0
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "TDDKata",
    products: [
        .library(
            name: "TDDKata",
            targets: ["TDDKata"]),
    ],
    targets: [
        .target(
            name: "TDDKata"),
        .testTarget(
            name: "TDDKataTests",
            dependencies: ["TDDKata"]),
    ]
)
